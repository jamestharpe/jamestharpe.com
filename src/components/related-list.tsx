import { WindowLocation } from "@reach/router";
import { Link } from "gatsby";
import React from "react";
import { useKnowledgeNetworkQuery } from "../tags";

type RelatedListProps = {
	location: WindowLocation;
	title?: string;
	tags?: string[];
};

const RelatedList: React.FC<RelatedListProps> = ({ location, title, tags }) => {
	const related = useKnowledgeNetworkQuery(location, tags);
	return (
		<>
			{/* Related - Articles */}
			{!!related.articles?.length && (
				<article>
					<h2>More Knowledge on {title}</h2>
					{related.articles.map((article) => (
						<section key={article.fields.slug}>
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
					<h2>Topics related to {title}</h2>
					{related.tags.map((article) => (
						<section key={article.fields.slug}>
							<Link to={article.fields.slug}>
								<h3>{article.frontmatter.title}</h3>
							</Link>
							<p>{article.frontmatter.description || article.excerpt}</p>
						</section>
					))}
				</article>
			)}
		</>
	);
};

export default RelatedList;
