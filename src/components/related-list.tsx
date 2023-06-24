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
						<section
							key={article.fields.slug}
							style={{ width: "100%", overflow: "auto" }}
						>
							<img
								src={
									article.frontmatter.thumbnail ??
									"/img/blog-article-generic_256x256.jpg"
								}
								height={128}
								width={128}
								alt={article.frontmatter.title}
								style={{ float: "left", marginRight: "1em" }}
							/>
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
						<section
							key={article.fields.slug}
							style={{ width: "100%", overflow: "auto" }}
						>
							<img
								src={
									article.frontmatter.thumbnail ??
									"/img/blog-article-generic_256x256.jpg"
								}
								height={128}
								width={128}
								alt={article.frontmatter.title}
								style={{ float: "left", marginRight: "1em" }}
							/>
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
