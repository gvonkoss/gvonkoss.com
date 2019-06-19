const { DateTime } = require('luxon');

module.exports = (config) => {
	config.addPassthroughCopy('src/images');

	config.addFilter('readableDate', dateObj => {
		return DateTime.fromJSDate(dateObj, {
			zone: 'utc'
		}).toFormat('LLLL d, y');
	});

	return {
		dir: { input: 'src', output: 'dist', includes: '_includes' },
		templateFormats: ['njk', 'md', 'js', 'css'],
		htmlTemplateEngine: 'njk',
		passthroughFileCopy: true
	}
}