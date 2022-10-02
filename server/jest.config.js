/* eslint-disable import/no-commonjs, import/unambiguous */

module.exports = {
	moduleFileExtensions: ["ts", "js"],
	transform: {
		"\\.(ts|tsx)$": "<rootDir>/node_modules/.bin/ts-jest"
	},
	testRegex: ".*.test.(ts|tsx|js)$"
};
