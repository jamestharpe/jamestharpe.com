module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-google-gtag/gatsby-browser.js'),
      options: {"plugins":[],"trackingIds":["UA-961598-2"],"pluginConfig":{"head":true,"respectDNT":true}},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"jamestharpe.com","short_name":"jamestharpe","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"static/favicon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"3dad28b148aac3cf66ed05e608ce86f5"},
    },{
      plugin: require('../node_modules/gatsby-plugin-lunr/gatsby-browser.js'),
      options: {"plugins":[],"languages":[{"name":"en","customEntries":[]}],"fields":[{"name":"title","store":true,"attributes":{"boost":20}},{"name":"content"},{"name":"tags"},{"name":"url","store":true}],"resolvers":{"MarkdownRemark":{}},"filename":"search_index.json","fetchOptions":{"credentials":"same-origin"}},
    },{
      plugin: require('../node_modules/gatsby-remark-graph/gatsby-browser.js'),
      options: {"plugins":[],"language":"mermaid","theme":"forest"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
