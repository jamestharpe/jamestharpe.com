/* eslint-disable @typescript-eslint/unbound-method */
import { CreateNodeArgs, CreatePagesArgs } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import { resolve } from "path";

export async function createPages(args: CreatePagesArgs) {
	const { graphql } = args;
	const { createPage } = args.actions;

	const { data, errors } = (await graphql(`
		query {
			allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
				nodes {
					fields {
						slug
					}
				}
			}
		}
	`)) as {
		data?: { allMdx: { nodes: { fields: { slug: string } }[] } };
		errors?: never;
	};

	if (errors || !data) {
		console.log("createPages could not create pages", errors);
		throw new Error("Failed to create pages");
	}

	data?.allMdx.nodes.forEach((node) => {
		const { slug } = node.fields;
		// console.log("Create page", { slug });
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

export /* async */ function onCreateNode(args: CreateNodeArgs) {
	const { node, getNode } = args;
	const { createNodeField } = args.actions;

	if (node.internal.type === `Mdx`) {
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
