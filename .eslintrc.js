module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		'jest/globals': true,
	},
	extends: ['standard', 'eslint-config-prettier'],
	plugins: ['jest'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {},
};
