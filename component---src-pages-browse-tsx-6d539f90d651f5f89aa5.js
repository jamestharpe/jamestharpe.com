"use strict";(self.webpackChunkjamestharpe_com=self.webpackChunkjamestharpe_com||[]).push([[815],{1153:function(e,t,n){n.r(t);var r=n(5444),l=n(7294),i=n(5821),o=n(1069),a=n(9186);t.default=function(e){var t=e.data,n=e.location;return l.createElement(i.Z,{location:n},l.createElement(o.Z,{title:"Browse James's Knowledge Graph: Topics",description:"Browse James Tharpe's Knowledge Graph"}),l.createElement("h1",null,"Browse the Knowledge Graph"),l.createElement("ul",null,t.allMdx.group.sort((function(e,t){return e.tag.localeCompare(t.tag)})).map((function(e,n){var i=t.allMdx.nodes.find((function(t){return t.fields.slug==="/"+e.tag+"/"}));return l.createElement("li",{key:n},l.createElement(r.Link,{to:"/"+e.tag,style:{fontSize:1+e.totalCount/100-.01+"em"}},(null==i?void 0:i.frontmatter.title)||(0,a.YL)(e.tag)))}))))}},9186:function(e,t,n){n.d(t,{YL:function(){return l},rA:function(){return i},$R:function(){return o}});var r=n(5444);function l(e){return e.split("-").map((function(e){return e.split("/").map((function(e){return e[0].toUpperCase()+e.substr(1)})).join(" / ")})).join(" ")}function i(e){var t=e.startsWith("/")?e.slice(1,e.length):e;return t.endsWith("/")?t.slice(0,-1):t}function o(e,t){var n=(0,r.useStaticQuery)("1957148337").allMdx,l=i(e),o={articles:null==n?void 0:n.nodes.filter((function(e){var t,n;return null===(t=e.frontmatter)||void 0===t||null===(n=t.tags)||void 0===n?void 0:n.includes(l)})),tags:null==n?void 0:n.nodes.filter((function(e){return null==t?void 0:t.includes(e.fields.slug.slice(1,-1))}))};if(o.tags&&o.tags.length!==(null==t?void 0:t.length))throw new Error("Pages for one or more tags is missing for tag "+JSON.stringify(t)+" on page "+l+". Received: "+JSON.stringify(o.tags.map((function(e){return e.fields.slug}))));return o}}}]);
//# sourceMappingURL=component---src-pages-browse-tsx-6d539f90d651f5f89aa5.js.map