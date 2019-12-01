const {
	override,
	addDecoratorsLegacy,
	disableEsLint,
	addBundleVisualizer,
	adjustWorkbox
} = require('customize-cra')
module.exports = override(
	// enable legacy decorators babel plugin
	addDecoratorsLegacy(),

	// disable eslint in webpack
	disableEsLint(),

	// add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
	process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

	// adjust the underlying workbox
	adjustWorkbox(wb =>
		Object.assign(wb, {
			skipWaiting: true,
			exclude: (wb.exclude || []).concat('index.html')
		})
	)
)
