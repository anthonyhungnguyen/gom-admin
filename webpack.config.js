const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	entry: ['./src/index.js', '@babel/polyfill'],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true
						}
					}
				],
				include: /\.module\.css$/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				exclude: /\.module\.css$/
			}
		]
	},
	plugins: [new HtmlWebPackPlugin({ template: './public/index.html' })]
}
