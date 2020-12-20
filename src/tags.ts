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

export function useKnowledgeNetworkQuery(
	locationPathname: string,
	tags?: string[]
) {
	const {
		allMarkdownRemark
	}: KnowledgeNetworkQueryResult = useStaticQuery(graphql`
		query KnowledgeNetworkQuery {
			allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }) {
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
	`);

	const slug = tagFromSlug(locationPathname);

	const result = {
		// Tagged with this article's slug
		articles: allMarkdownRemark?.nodes.filter((article) =>
			article.frontmatter?.tags?.includes(slug)
		),
		// Tagged by this article
		tags: allMarkdownRemark?.nodes.filter((article) =>
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
