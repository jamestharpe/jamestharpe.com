import { graphql, Link, PageProps } from "gatsby";
import React, { FC } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

type ArticleTemplateData = {
	markdownRemark: {
		html: string;
		title: string;
		fields: {
			slug: string;
		};
		frontmatter: {
			description?: string;
			tags?: string[];
			title?: string;
		};
	};
	allMarkdownRemark?: {
		nodes: {
			excerpt: string;
			fields: {
				slug: string;
			};
			frontmatter: {
				description?: string;
				title?: string;
				tags?: string[];
			};
		}[];
	};
};

const ArticleTemplate: FC<PageProps<ArticleTemplateData>> = ({
	data: { markdownRemark, allMarkdownRemark },
	location
}) => {
	const related = {
		// Tagged with this article's slug
		articles: allMarkdownRemark?.nodes.filter((article) =>
			article.frontmatter.tags
				?.map((tag) => `/${tag}/`)
				.includes(markdownRemark.fields.slug)
		),
		// Tagged by this article
		tags: allMarkdownRemark?.nodes.filter((article) =>
			markdownRemark.frontmatter.tags
				?.map((tag) => `/${tag}/`)
				.includes(article.fields.slug)
		)
	};

	if (
		related.tags &&
		related.tags.length !== markdownRemark.frontmatter.tags?.length
	) {
		throw new Error(
			`Pages for one or more tags is missing for tag ${JSON.stringify(
				markdownRemark.frontmatter.tags
			)} on page ${markdownRemark.fields.slug}. Received: ${JSON.stringify(
				related.tags.map((t) => t.fields.slug)
			)}`
		);
	}
	return (
		<Layout location={location}>
			<SEO
				title={markdownRemark.frontmatter.title}
				description={markdownRemark.frontmatter.description || ""}
			/>
			<div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
			{/* Related - Articles */}
			{!!related.articles?.length && (
				<article>
					<h2>More Knowledge on {markdownRemark.frontmatter.title}</h2>
					{related.articles.map((article) => (
						<section>
							<Link to={article.fields.slug}>
								<h3>{article.frontmatter.title}</h3>
							</Link>
							<p>{article.frontmatter.description || article.excerpt}</p>
						</section>
					))}
				</article>
			)}
			{/* Related - Tags */}
			{!!related.tags?.length && (
				<article>
					<h2>Topics related to {markdownRemark.frontmatter.title}</h2>
					{related.tags.map((article) => (
						<section>
							<Link to={article.fields.slug}>
								<h3>{article.frontmatter.title}</h3>
							</Link>
							<p>{article.frontmatter.description || article.excerpt}</p>
						</section>
					))}
				</article>
			)}
		</Layout>
	);
};

export default ArticleTemplate;

export const pageQuery = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			fields {
				slug
			}
			frontmatter {
				title
				tags
			}
		}
		allMarkdownRemark(filter: { frontmatter: { draft: { ne: false } } }) {
			nodes {
				excerpt
				frontmatter {
					title
					tags
					description
				}
				fields {
					slug
				}
			}
		}
	}
`;
