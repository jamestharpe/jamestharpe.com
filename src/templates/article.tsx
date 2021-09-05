import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React, { FC } from "react";
import Layout from "../components/layout";
import RelatedList from "../components/related-list";
import RelatedNetwork from "../components/related-network";
import SEO from "../components/seo";

type ArticleTemplateData = {
	mdx: {
		body: string;
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
};

const ArticleTemplate: FC<PageProps<ArticleTemplateData>> = ({
	data: { mdx },
	location
}) => {
	return (
		<Layout location={location}>
			<SEO
				title={mdx.frontmatter.title}
				description={mdx.frontmatter.description || ""}
			/>
			<article aria-label={mdx.title}>
				<MDXRenderer>{mdx.body}</MDXRenderer>
				<RelatedList
					location={location}
					tags={mdx.frontmatter.tags}
					title={mdx.frontmatter.title}
				/>
				<section>
					<h2>{mdx.frontmatter.title} Knowledge Graph</h2>
					<RelatedNetwork
						locationPathname={location.pathname}
						tags={mdx.frontmatter.tags}
						title={mdx.frontmatter.title}
					/>
				</section>
			</article>
		</Layout>
	);
};

export default ArticleTemplate;

export const pageQuery = graphql`
	query($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			body
			fields {
				slug
			}
			frontmatter {
				title
				tags
			}
		}
	}
`;
