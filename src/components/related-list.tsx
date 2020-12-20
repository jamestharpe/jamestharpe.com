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
	const related = useKnowledgeNetworkQuery(location.pathname, tags);
	return (
		<>
			{/* Related - Articles */}
			{!!related.articles?.length && (
				<section>
					<h2>Deeper Knowledge on {title}</h2>
					{related.articles.map((article) => (
						<section key={article.fields.slug}>
							<Link to={article.fields.slug}>
								<h3>{article.frontmatter.title}</h3>
							</Link>
							<p>{article.frontmatter.description || article.excerpt}</p>
						</section>
					))}
				</section>
			)}
			{/* Related - Tags */}
			{!!related.tags?.length && (
				<section>
					<h2>Broader Topics Related to {title}</h2>
					{related.tags.map((article) => (
						<section key={article.fields.slug}>
							<Link to={article.fields.slug}>
								<h3>{article.frontmatter.title}</h3>
							</Link>
							<p>{article.frontmatter.description || article.excerpt}</p>
						</section>
					))}
				</section>
			)}
		</>
	);
};

export default RelatedList;
