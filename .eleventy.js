module.exports = (config) => {
	config.addPassthroughCopy('src/images');

	return {
		dir: { input: 'src', output: 'dist', includes: '_includes' },
		templateFormats: ['njk', 'md', 'css'],
		htmlTemplateEngine: 'njk'
	}
}