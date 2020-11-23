import { graphql, Link, PageProps } from "gatsby";
import React, { FC } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";


type IndexPageData = {
	allMarkdownRemark: {
		totalCount: number;
		nodes: {
			id: number;
			excerpt: string;
			fields: {
				slug: string;
			};
			frontmatter: {
				date: string;
				title: string;
			};
		}[];
	};
};

const IndexPage: FC<PageProps<IndexPageData>> = ({ data, location }) => (
	<Layout location={location}>
		<SEO title="Knowledge Log" description="James Tharpe's Knowledge Log" />
		<h1>Welcome!</h1>
		<p>
			This is my knowledge log. When I learn something, I log it here so that I can
			reference it later. I publish it freely online so it's easily accessible; if
			folks other than myself find it useful, that's great! If it's not useful,
			that's fine too.
		</p>
		<h2>My Learn List</h2>
		<p>
			<strong>Here's how the Learn List works:</strong> When I want to learn
			something, I add it to the list. Sometimes to "learn something", you have to
			break it down into smaller things, so the items on the list are nested. I try
			to keep each topic small, so that I can learn it in about a day.
		</p>
		<p>
			Items that are linked are things that I'm currently learning. When I'm done
			learning, I remove the item from the list. That means that the list below
			will probably seem incomplete if you aren't me. To see things I've learned,
			search this site or <Link to="/browse/">browse topics I've learned</Link>.
			You might find more complete information there. Then again, you might not.
		</p>

		<h2>Knowledge List ({data.allMarkdownRemark.totalCount} Posts)</h2>
		{data.allMarkdownRemark.nodes.map((node) => (
			<div key={node.id}>
				<h3>
					<Link to={node.fields.slug}>{node.frontmatter.title} </Link>—{" "}
					{node.frontmatter.date}
				</h3>
				<p>{node.excerpt}</p>
			</div>
		))}
	</Layout>
);

export const query = graphql`
	query {
		allMarkdownRemark(
			limit: 10
			sort: { fields: frontmatter___date, order: DESC }
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
					date(formatString: "YYYY-MM-DD")
				}
			}
		}
	}
`;

export default IndexPage;
