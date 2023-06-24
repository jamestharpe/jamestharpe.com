import { graphql, useStaticQuery } from "gatsby";

export function forHumans(tag: string) {
	return tag
		.split("-")
		.map((word) =>
			word
				.split("/")
				.map((word) => word[0].toUpperCase() + word.substr(1))
				.join(" / ")
		)
		.join(" ");
}

export function tagFromSlug(path: string) {
	const result = path.startsWith("/") ? path.slice(1, path.length) : path;
	return result.endsWith("/") ? result.slice(0, -1) : result;
}

type KnowledgeNetworkQueryResult = {
	allMdx?: {
		nodes: {
			excerpt: string;
			fields: {
				slug: string;
			};
			frontmatter: {
				description?: string;
				thumbnail?: string;
				title?: string;
				tags?: string[];
			};
		}[];
	};
};

export function useKnowledgeNetworkQuery(
	locationPathname: string,
	tags?: string[]
) {
	const { allMdx }: KnowledgeNetworkQueryResult = useStaticQuery(graphql`
		query KnowledgeNetworkQuery {
			allMdx(
				filter: { frontmatter: { draft: { ne: true } } }
				sort: { fields: [frontmatter___date], order: DESC }
			) {
				nodes {
					excerpt
					frontmatter {
						thumbnail
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
	`);

	const slug = tagFromSlug(locationPathname);

	const result = {
		// Tagged with this article's slug
		articles: allMdx?.nodes.filter((article) =>
			article.frontmatter?.tags?.includes(slug)
		),
		// Tagged by this article
		tags: allMdx?.nodes.filter((article) =>
			tags?.includes(article.fields.slug.slice(1, -1))
		)
	};

	if (result.tags && result.tags.length !== tags?.length) {
		throw new Error(
			`Pages for one or more tags is missing for tag ${JSON.stringify(
				tags
			)} on page ${slug}. Received: ${JSON.stringify(
				result.tags.map((t) => t.fields.slug)
			)}`
		);
	}

	return result;
}
