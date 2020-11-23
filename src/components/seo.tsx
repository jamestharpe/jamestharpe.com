/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

type SEOProps = {
	author?: string;
	description?: string;
	lang?: string;
	meta?: { name: string; content: string }[];
	title: string;
};

const SEO: React.FC<SEOProps> = ({
	author,
	description,
	lang,
	meta,
	title
}) => {
	const {
		site: {
			siteMetadata: {
				author: defaultAuthor,
				description: defaultDescription,
				title: siteTitle
			}
		}
	}: {
		site: {
			siteMetadata: { author: string; description: string; title: string };
		};
	} = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						author
						description
						title
					}
				}
			}
		`
	);

	author = author || defaultAuthor;
	description = description || defaultDescription;
	lang = lang || "en";
	meta = meta || [];

	return (
		<Helmet
			htmlAttributes={{
				lang
			}}
			title={title}
			titleTemplate={title ? `%s | ${siteTitle}` : undefined}
			meta={[
				{
					name: `description`,
					content: description
				},
				{
					property: `og:title`,
					content: title
				},
				{
					property: `og:description`,
					content: description
				},
				{
					property: `og:type`,
					content: `website`
				},
				{
					name: `twitter:card`,
					content: `summary`
				},
				{
					name: `twitter:creator`,
					content: author
				},
				{
					name: `twitter:title`,
					content: title
				},
				{
					name: `twitter:description`,
					content: description
				}
			].concat(meta)}
		/>
	);
};

export default SEO;
