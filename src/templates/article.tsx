import { graphql, PageProps } from "gatsby";
import React, { FC } from "react";
import Layout from "../components/layout";
import RelatedList from "../components/related-list";
import RelatedNetwork from "../components/related-network";
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
};

const ArticleTemplate: FC<PageProps<ArticleTemplateData>> = ({
	data: { markdownRemark },
	location
}) => {
	return (
		<Layout location={location}>
			<SEO
				title={markdownRemark.frontmatter.title}
				description={markdownRemark.frontmatter.description || ""}
			/>
			<article>
				<section
					dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
				></section>
				<RelatedList
					location={location}
					tags={markdownRemark.frontmatter.tags}
					title={markdownRemark.frontmatter.title}
				/>
				<section>
					<h2>{markdownRemark.frontmatter.title} Knowledge Graph</h2>
					<RelatedNetwork
						locationPathname={location.pathname}
						tags={markdownRemark.frontmatter.tags}
						title={markdownRemark.frontmatter.title}
					/>
				</section>
			</article>
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
	}
`;
