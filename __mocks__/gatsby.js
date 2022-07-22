/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

// See https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/#3-useful-mocks-to-complete-your-testing-environment

const React = require("react");
const gatsby = jest.requireActual("gatsby");

module.exports = {
	...gatsby,
	graphql: jest.fn(),
	Link: jest.fn().mockImplementation(
		// these props are invalid for an `a` tag
		({
			activeClassName,
			activeStyle,
			getProps,
			innerRef,
			partiallyActive,
			ref,
			replace,
			to,
			...rest
		}) =>
			React.createElement("a", {
				...rest,
				href: to
			})
	),
	StaticQuery: jest.fn(),
	useStaticQuery: jest.fn()
};
