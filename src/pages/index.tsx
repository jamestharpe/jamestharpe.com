import { graphql, Link, PageProps } from "gatsby";
import React, { FC } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

type IndexPageData = {
	allMdx: {
		totalCount: number;
		nodes: {
			id: number;
			excerpt: string;
			fields: {
				slug: string;
			};
			frontmatter: {
				date: string;
				description: string;
				title: string;
			};
		}[];
	};
};

const IndexPage: FC<PageProps<IndexPageData>> = ({ data, location }) => (
	<Layout location={location}>
		<SEO title="Knowledge Log" description="James Tharpe's Knowledge Log" />
		<h1>Welcome!</h1>
		<article>
			<p>
				This is my knowledge log. When I learn something, I log it here so that I
				can reference it later. I publish it freely online so it's easily
				accessible; if folks other than myself find it useful, that's great! If it's
				not useful, that's fine too.
			</p>
			<h2>Ten Most Recent Posts (of {data.allMdx.totalCount} Total)</h2>
			{data.allMdx.nodes.map((node) => (
				<section key={node.id}>
					<h3>
						<Link to={node.fields.slug}>{node.frontmatter.title} </Link>—{" "}
						{node.frontmatter.date}
					</h3>
					<p>{node.frontmatter.description || node.excerpt}</p>
				</section>
			))}
		</article>
	</Layout>
);

export const query = graphql`
	query {
		allMdx(
			limit: 10
			sort: { fields: frontmatter___date, order: DESC }
			filter: { frontmatter: { draft: { ne: true } } }
		) {
			totalCount
			nodes {
				id
				excerpt
				fields {
					slug
				}
				frontmatter {
					title
					description
					date(formatString: "YYYY-MM-DD")
				}
			}
		}
	}
`;

export default IndexPage;
