/* eslint-disable @typescript-eslint/unbound-method */
import { CreateNodeArgs, CreatePagesArgs } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import { resolve } from "path";

export async function createPages(args: CreatePagesArgs) {
	const { graphql } = args;
	const { createPage } = args.actions;

	const { data, errors } = (await graphql(`
		query {
			allMarkdownRemark {
				nodes {
					fields {
						slug
					}
				}
			}
		}
	`)) as {
		data?: { allMarkdownRemark: { nodes: { fields: { slug: string } }[] } };
		errors?: never;
	};

	if (errors || !data) {
		console.log("createPages could not create pages", errors);
		throw new Error("Failed to create pages");
	}

	data?.allMarkdownRemark.nodes.forEach((node) => {
		const { slug } = node.fields;
		console.log("Create page", { slug });
		createPage({
			path: slug,
			component: resolve(`./src/templates/article.tsx`),
			context: { slug }
		});
	});
}

export function createSchemaCustomization() {
	// Nothing to do yet...
}

export /* async */ function onCreateNode(args: CreateNodeArgs<Node>) {
	const { node, getNode } = args;
	const { createNodeField } = args.actions;

	if (node.internal.type === `MarkdownRemark`) {
		// Slug for path
		const slug = createFilePath({ node, getNode, basePath: `content` });
		createNodeField({
			node,
			name: `slug`,
			value: slug
		});
	}
}

export function onCreatePage() {
	// Nothing to do yet...
}
