/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// See https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/#setting-up-your-environment

const babelOptions = {
	presets: ["babel-preset-gatsby", "@babel/preset-typescript"]
};

module.exports = require("babel-jest").default.createTransformer(babelOptions);
