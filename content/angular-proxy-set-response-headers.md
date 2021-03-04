---
date: 2021-03-04T14:51:10-04:00
description: "Use 'bypass' to modify request and response headers in the Angular Proxy"
tags: [ "angular" ]
title: "Modify Response Headers in Angular Proxy (ng serve)"
---

# Modify Response Headers in Angular Proxy

Angular includes the ability to [proxy requests to back-end servers](https://angular.io/guide/build#proxying-to-a-backend-server). This feature can also be used to modify responses.

To modify responses, create `roxy.conf.js` in the `src` folder, then add an entry to modify the response headers:

```javascript
module.exports = {
	"/path/**": {
		secure: false,
		bypass: function(req, res, opts) {
			res.setHeader("x-your-header", "value");
		}
	}
}
```

Now, after you run `ng server --proxy-config 	src/proxy.config.js` requests to `/path` will contain the header.
