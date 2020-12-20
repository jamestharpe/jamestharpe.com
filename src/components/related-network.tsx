import { WindowLocation } from "@reach/router";
import React from "react";
import { tagFromSlug, useKnowledgeNetworkQuery } from "../tags";

type RelatedNetworkProps = {
	location: WindowLocation;
	title?: string;
	tags?: string[];
};

const RelatedNetwork: React.FC<RelatedNetworkProps> = ({
	location,
	title,
	tags
}) => {
	const widthConstraint = {
		maximum: 150
	};
	const color = {
		border: "#FAB84C",
		background: "#7CCB7D",
		highlight: { border: "#314A5E", background: "#B6E2B7" },
		hover: { border: "#314A5E", background: "#B6E2B7" },
		font: {
			color: "#411811"
		}
	};
	const related = useKnowledgeNetworkQuery(location, tags);
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
				color
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
					color
				};
			}) || []
		)
		.concat([
			{
				id: location.pathname,
				label: title,
				title: "This article",
				slug: location.pathname,
				tag: tagFromSlug(location.pathname),
				tags,
				shape: "circle",
				widthConstraint,
				color
			}
		]);

	const approxLinesOfText = Math.ceil(
		nodes.reduce((prev, curr) => prev + (curr.label?.length || 0), 0) / 14
	);

	const edges = nodes.reduce<{ to: string; from: string }[]>((prev, current) => {
		return prev.concat(
			nodes
				.filter((n) => current.tags?.includes(n.tag))
				.map((n) => {
					return { from: n.id, to: current.id, length: 175 };
				}) || []
		);
	}, []);

	const options = {
		autoResize: true,
		layout: {
			hierarchical: false
		},
		edges: {
			color: "#411811"
		}
		// height: `${100 * nodes.length}px`,
		// width: `100%`
	};
	const events = {
		select: function (event: { nodes: string[] }) {
			if (event.nodes?.length === 1) {
				window.location.href = event.nodes[0];
			}
			// console.log("event", event);
		}
	};

	return (
		<article>
			{/* <h2>{title} Knowledge Graph</h2>
			<div
				style={{
					height: `${2 * (approxLinesOfText + edges.length)}em`,
					width: `${8 * nodes.length + 8}em`,
					maxWidth: "100%",
					minWidth: "30%",
					maxHeight: "512px"
				}}
			>
				<Graph graph={{ nodes, edges }} options={options} events={events} />
			</div> */}
		</article>
	);
};

export default RelatedNetwork;
