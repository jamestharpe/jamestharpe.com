const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-tsx": hot(preferDefault(require("C:\\Users\\james\\code\\me\\jamestharpe.com-hugo\\src\\pages\\404.tsx"))),
  "component---src-pages-browse-tsx": hot(preferDefault(require("C:\\Users\\james\\code\\me\\jamestharpe.com-hugo\\src\\pages\\browse.tsx"))),
  "component---src-pages-hire-me-tsx": hot(preferDefault(require("C:\\Users\\james\\code\\me\\jamestharpe.com-hugo\\src\\pages\\hire-me.tsx"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("C:\\Users\\james\\code\\me\\jamestharpe.com-hugo\\src\\pages\\index.tsx"))),
  "component---src-templates-article-tsx": hot(preferDefault(require("C:\\Users\\james\\code\\me\\jamestharpe.com-hugo\\src\\templates\\article.tsx")))
}

