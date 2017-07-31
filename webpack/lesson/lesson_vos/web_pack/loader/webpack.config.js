var webpack = require('webpack');
module.exports = {
	entry: __dirname + "/src/js/index.js",
	output: {
		path: __dirname + "/assets/js",
		filename: "index.js",
		publicPath: "/temp/"
	},
	devServer: {
		contentBase: './',
		host: "192.168.1.125",
		port: "8080",
		color: true
	},
	module: {
		loaders: [{
			test: /\.json$/,
			loader: "json"
		}, {
			test: /\.js$/,
			exclude:/node_modules/,
			loader: "babel",
			query:{
				presets:['es2015','react']
			}
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}