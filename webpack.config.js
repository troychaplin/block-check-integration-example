const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'accessibility-checks': path.resolve(__dirname, 'src/accessibility-checks.js'),
	},
};
