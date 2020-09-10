const { DateTime } = require('luxon');

module.exports = (config) => {
	config.addPassthroughCopy('src/images');
	config.addPassthroughCopy('src/fonts');

	config.addFilter('readableDate', dateObj => {
		return DateTime.fromJSDate(dateObj, {
			zone: 'utc'
		}).toFormat('LLLL d, y');
	});

	return {
		dir: { input: 'src', output: 'dist', includes: '_includes' },
		templateFormats: ['njk', 'md', 'css'],
		htmlTemplateEngine: 'njk',
		passthroughFileCopy: true
	}
}