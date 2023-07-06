module.exports = {
	extends: [
		"next",
		"turbo",
		"prettier",
		"plugin:@typescript-eslint/recommended",
	],
	parser: "@typescript-eslint/parser",
	rules: {
		"@next/next/no-html-link-for-pages": "off",
		"prettier/prettier": ["error"],
	},
	plugins: ["prettier", "@typescript-eslint"],
	parserOptions: {
		babelOptions: {
			presets: [require.resolve("next/babel")],
		},
	},
};
