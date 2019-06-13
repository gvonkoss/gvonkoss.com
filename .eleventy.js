module.exports = (config) => {
	config.addPassthroughCopy('src/images');

	return {
		dir: { input: 'src', output: 'dist', includes: '_includes' },
		templateFormats: ['njk', 'md', 'js', 'css'],
		htmlTemplateEngine: 'njk',
		passthroughFileCopy: true
	}
}