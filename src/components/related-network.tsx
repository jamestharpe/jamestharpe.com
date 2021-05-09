import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";
import { tagFromSlug, useKnowledgeNetworkQuery } from "../tags";

type RelatedNetworkProps = {
	locationPathname: string;
	title?: string;
	tags?: string[];
};

const RelatedNetwork: React.FC<RelatedNetworkProps> = ({
	locationPathname,
	title,
	tags
}) => {
	const widthConstraint = {
		maximum: 150
	};
	const color = {
		border: "#411811",
		background: "#7CCB7D",
		highlight: { border: "#314A5E", background: "#B6E2B7" },
		hover: { border: "#314A5E", background: "#FFFFFF" }
	};
	const font = {
		color: "#411811"
	};
	const related = useKnowledgeNetworkQuery(locationPathname, tags);
	const nodes = (
		related.articles?.map((a) => {
			return {
				id: a.fields.slug,
				label: a.frontmatter.title,
				title: a.frontmatter.description,
				slug: a.fields.slug,
				tag: tagFromSlug(a.fields.slug),
				tags: a.frontmatter.tags,
				shape: "box",
				widthConstraint,
				color,
				font
			};
		}) || []
	)
		.concat(
			related.tags?.map((t) => {
				return {
					id: t.fields.slug,
					label: t.frontmatter.title,
					title: t.frontmatter.description,
					slug: t.fields.slug,
					tag: tagFromSlug(t.fields.slug),
					tags: t.frontmatter.tags,
					shape: "ellipse",
					widthConstraint,
					color,
					font
				};
			}) || []
		)
		.concat([
			{
				id: locationPathname,
				label: title,
				title: "This article",
				slug: locationPathname,
				tag: tagFromSlug(locationPathname),
				tags,
				shape: "circle",
				widthConstraint,
				color: {
					...color,
					background: "#411811"
				},
				font: {
					color: "#7CCB7D"
				}
			}
		])
		.filter(
			(node, index, self) =>
				index === self.findIndex((candidateNode) => candidateNode.id === node.id)
		);

	const approxLinesOfText = Math.ceil(
		nodes.reduce((prev, curr) => prev + (curr.label?.length || 0), 0) / 14
	);

	const edges = nodes.reduce<{ to: string; from: string }[]>((prev, current) => {
		return prev.concat(
			nodes
				.filter((n) => current.tags?.includes(n.tag))
				.map((n) => {
					return { from: n.id, to: current.id, length: 175, arrows: { to: true } };
				}) || []
		);
	}, []);

	const visJsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const network =
			visJsRef.current &&
			new Network(
				visJsRef.current,
				{ nodes, edges },
				{
					autoResize: true,
					edges: {
						color: "#411811"
					}
				}
			);
		network?.on("selectNode", (event: { nodes: string[] }) => {
			if (event.nodes?.length === 1) {
				window.location.href = event.nodes[0];
			}
		});
	}, [visJsRef, nodes, edges]);

	const height = 2 * (approxLinesOfText + edges.length);

	return (
		<div
			ref={visJsRef}
			style={{
				height: `${height < 150 ? 150 : height}em`,
				width: `${8 * nodes.length + 8}em`,
				maxWidth: "100%",
				minWidth: "30%",
				maxHeight: "512px"
			}}
		/>
	);
};

export default RelatedNetwork;
