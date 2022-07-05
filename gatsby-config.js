/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-check

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
module.exports = {
	siteMetadata: {
		title: `James's Knowledge Graph`,
		description: `This website captures knowledge so I can refer to it later.`,
		author: `@jamestharpe`,
		siteUrl: `https://www.jamestharpe.com/`
	},
	plugins: [
		{
			resolve: `gatsby-plugin-google-gtag`,
			options: {
				// You can add multiple tracking ids and a page view event will be fired for all of them.
				trackingIds: [
					"UA-961598-2" // Google Analytics / GA
					// "AW-CONVERSION_ID", // Google Ads / AdWords / AW
					// "DC-FLOODLIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
				],
				// This object gets passed directly to the gtag config command
				// This config will be shared across all trackingIds
				// gtagConfig: {
				//   optimize_id: "OPT_CONTAINER_ID",
				//   anonymize_ip: true,
				//   cookie_expires: 0,
				//   send_page_view: true
				// },
				pluginConfig: {
					// Puts tracking script in the head instead of the body
					head: true,
					// Setting this parameter is also optional
					respectDNT: true
					// Avoids sending hits from custom paths
					// exclude: ["/preview/**", "/do-not-track/me/too/"],
				}
			}
		},
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/static/img`
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `jamestharpe.com`,
				short_name: `jamestharpe`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `static/favicon.png` // This path is relative to the root of the site.
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `content`,
				path: `${__dirname}/content/`
			}
		},
		{
			resolve: `gatsby-plugin-lunr`,
			options: {
				languages: [
					{
						// ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
						name: "en",
						// A function for filtering nodes. () => true by default
						filterNodes: (node) => !!node.frontmatter && !node.frontmatter.draft,
						// Add to index custom entries, that are not actually extracted from gatsby nodes
						customEntries: [
							//  Example: { title: "Pictures", content: "awesome pictures", url: "/pictures" }
						]
					}
				],
				// Fields to index. If store === true value will be stored in index file.
				// Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
				fields: [
					{ name: "title", store: true, attributes: { boost: 20 } },
					{ name: "content" },
					{ name: "tags" },
					{ name: "url", store: true }
				],
				// How to resolve each field's value for a supported node type
				resolvers: {
					// For any node of type Mdx, list how to resolve the fields' values
					Mdx: {
						title: (node) => node.frontmatter.title,
						content: (node) => node.rawMarkdownBody,
						tags: (node) => node.frontmatter.tags,
						url: (node) => node.fields.slug
					}
				},
				//custom index file name, default is search_index.json
				filename: "search_index.json",
				//custom options on fetch api call for search_index.json
				fetchOptions: {
					credentials: "same-origin"
				}
			}
		},
		"gatsby-remark-graph", // Needed here AND in gatsby-plugin-mdx for the plug-ins gatsby-browser.js file to run
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: [`.md`, `.mdx`],
				remarkPlugins: [require("remark-math"), require("remark-html-katex")],
				gatsbyRemarkPlugins: [
					"@tmus/gatsby-remark-links-normalizer",
					{
						resolve: "gatsby-remark-graph",
						options: {
							// this is the language in your code-block that triggers mermaid parsing
							language: "mermaid", // default
							theme: "forest" // default, dark, forest, or neutral
						}
					},
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							// Class prefix for <pre> tags containing syntax highlighting;
							// defaults to 'language-' (e.g. <pre class="language-js">).
							// If your site loads Prism into the browser at runtime,
							// (e.g. for use with libraries like react-live),
							// you may use this to prevent Prism from re-processing syntax.
							// This is an uncommon use-case though;
							// If you're unsure, it's best to use the default value.
							classPrefix: "language-",
							// This is used to allow setting a language for inline code
							// (i.e. single back-ticks) by creating a separator.
							// This separator is a string and will do no white-space
							// stripping.
							// A suggested value for English speakers is the non-ascii
							// character '›'.
							inlineCodeMarker: null,
							// This lets you set up language aliases.  For example,
							// setting this to '{ sh: "bash" }' will let you use
							// the language "sh" which will highlight using the
							// bash highlighter.
							aliases: {},
							// This toggles the display of line numbers globally alongside the code.
							// To use it, add the following line in gatsby-browser.js
							// right after importing the prism color scheme:
							//  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
							// Defaults to false.
							// If you wish to only show line numbers on certain code blocks,
							// leave false and use the {numberLines: true} syntax below
							showLineNumbers: false,
							// If setting this to true, the parser won't handle and highlight inline
							// code used in markdown i.e. single backtick code like `this`.
							noInlineHighlight: false,
							// This adds a new language definition to Prism or extend an already
							// existing language definition. More details on this option can be
							// found under the header "Add new language definition or extend an
							// existing language" below.
							languageExtensions: [
								{
									language: "superscript",
									extend: "javascript",
									definition: {
										superscript_types: /(SuperType)/
									},
									insertBefore: {
										function: {
											superscript_keywords: /(superif|superelse)/
										}
									}
								}
							],
							// Customize the prompt used in shell output
							// Values below are default
							prompt: {
								user: "root",
								host: "localhost",
								global: false
							},
							// By default the HTML entities <>&'" are escaped.
							// Add additional HTML escapes by providing a mapping
							// of HTML entities and their escape value IE: { '}': '&#123;' }
							escapeEntities: {}
						}
					}
				]
			}
		},
		{
			resolve: "gatsby-plugin-feed",
			options: {
				query: `
					{
						site {
							siteMetadata {
								title
								description
								siteUrl
								site_url: siteUrl
							}
						}
					}
					`,
				feeds: [
					{
						serialize: ({ query: { site, allMdx } }) => {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-call
							return allMdx.nodes.map(
								(
									/** @type {{ frontmatter: { description: string; date: string; }; excerpt: string; fields: { slug: string; }; }} */ node
								) => {
									return Object.assign({}, node.frontmatter, {
										description: node.frontmatter.description || node.excerpt,
										date: node.frontmatter.date,
										url: site.siteMetadata.siteUrl + node.fields.slug,
										guid: site.siteMetadata.siteUrl + node.fields.slug,
										custom_elements: [
											{
												"content:encoded": `
													<p>
														${node.frontmatter.description || node.excerpt}
													</p>
													<p>
														<a href="${site.siteMetadata.siteUrl + node.fields.slug}">Read the article</a>
													</p>"
												`.trim()
											}
										]
									});
								}
							);
						},
						query: `
							{
								allMdx(
									filter: { frontmatter: { draft: { ne: true } } },
									sort: { order: DESC, fields: [frontmatter___date] },
								) {
									nodes {
										excerpt
										fields { slug }
										frontmatter {
											title
											description
											date
										}
									}
								}
							}
						`,
						output: "/rss.xml",
						title: "James Tharpe's Knowledge Feed"
					}
				]
			}
		},
		"gatsby-plugin-catch-links",
		{ resolve: "gatsby-redirect-from", options: { query: "allMdx" } },
		"gatsby-plugin-meta-redirect" // make sure this is always the last one
	]
};
