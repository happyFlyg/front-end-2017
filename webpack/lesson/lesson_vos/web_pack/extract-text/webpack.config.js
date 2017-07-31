var wabpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//导出到不同路径
var extract_css=new ExtractTextPlugin('../css/[name].css'); 
module.exports = {
	entry: __dirname + '/src/js/index.js',
	output: {
		path: __dirname + '/assets/js',
		filename: 'index.js',
		publicPath: '/temp/'
	},
	devServer: {
		contentBase: './',
		host: '192.168.1.125',
		port: '8080',
		color: true
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: extract_css.extract("style-loader", "css-loader")
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		extract_css
	]
}