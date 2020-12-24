import { graphql, Link, PageProps } from "gatsby";
import React, { FC } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { forHumans } from "../tags";

type BrowsePageData = {
	allMarkdownRemark: {
		totalCount: number;
		group: {
			tag: string;
			totalCount: number;
		}[];
		nodes: {
			fields: { slug: string };
			frontmatter: { title: string; tags: string[] };
		}[];
	};
};

const BrowsePage: FC<PageProps<BrowsePageData>> = ({ data, location }) => {
	return (
		<Layout location={location}>
			<SEO
				title="Browse James's Knowledge Graph: Topics"
				description="Browse James Tharpe's Knowledge Graph"
			/>
			<h1>Browse the Knowledge Graph</h1>
			<ul>
				{data.allMarkdownRemark.group
					.sort((g1, g2) => g1.tag.localeCompare(g2.tag))
					.map((group, index) => {
						const article = data.allMarkdownRemark.nodes.find(
							(node) => node.fields.slug === `/${group.tag}/`
						);
						return (
							<li key={index}>
								<Link
									to={`/${group.tag}`}
									style={{ fontSize: `${1 + group.totalCount / 100 - 0.01}em` }}
								>
									{article?.frontmatter.title || forHumans(group.tag)}
								</Link>
							</li>
						);
					})}
			</ul>
		</Layout>
	);
};

export const query = graphql`
	query Browse {
		allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }) {
			totalCount
			group(field: frontmatter___tags) {
				tag: fieldValue
				totalCount
			}
			nodes {
				fields {
					slug
				}
				frontmatter {
					title
					tags
				}
			}
		}
	}
`;

export default BrowsePage;
