// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  "component---src-pages-404-tsx": () => import("./../../../src/pages/404.tsx" /* webpackChunkName: "component---src-pages-404-tsx" */),
  "component---src-pages-browse-tsx": () => import("./../../../src/pages/browse.tsx" /* webpackChunkName: "component---src-pages-browse-tsx" */),
  "component---src-pages-hire-me-tsx": () => import("./../../../src/pages/hire-me.tsx" /* webpackChunkName: "component---src-pages-hire-me-tsx" */),
  "component---src-pages-index-tsx": () => import("./../../../src/pages/index.tsx" /* webpackChunkName: "component---src-pages-index-tsx" */),
  "component---src-templates-article-tsx": () => import("./../../../src/templates/article.tsx" /* webpackChunkName: "component---src-templates-article-tsx" */)
}

