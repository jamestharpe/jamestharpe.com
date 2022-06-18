/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

const React = require("react");

const HeadComponents = [
	<script
		key="ad-words"
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9780845735209569"
		crossOrigin="anonymous"
	></script>
];

exports.onRenderBody = ({ setHeadComponents }) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	setHeadComponents(HeadComponents);
};
