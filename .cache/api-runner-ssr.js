var plugins = [{
      plugin: require('C:/Users/james/code/me/jamestharpe.com-hugo/node_modules/gatsby-plugin-google-gtag/gatsby-ssr'),
      options: {"plugins":[],"trackingIds":["UA-961598-2"],"pluginConfig":{"head":true,"respectDNT":true}},
    },{
      plugin: require('C:/Users/james/code/me/jamestharpe.com-hugo/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/james/code/me/jamestharpe.com-hugo/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"jamestharpe.com","short_name":"jamestharpe","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"static/favicon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"3dad28b148aac3cf66ed05e608ce86f5"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
