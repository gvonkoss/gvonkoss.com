module.exports = (config) => ({
	dir: { input: 'src', output: 'dist', includes: '_includes' },
	templateFormats: ['njk', 'md', 'css'],
	htmlTemplateEngine: 'njk'
})