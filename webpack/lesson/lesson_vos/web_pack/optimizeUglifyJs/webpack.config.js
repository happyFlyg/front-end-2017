var webpack = require('webpack');
var webpack_hot = new webpack.HotModuleReplacementPlugin();
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extract_css = new ExtractTextPlugin('../css/index.css');
module.exports = {
	entry: __dirname + "/src/js/index.js",
	output: {
		path: __dirname + "/assets/",
		filename: "js/index.js"
	},
	devServer: {
		contentBase: './',
		host: '',
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
		extract_css,
		webpack_hot,
		new HtmlWebpackPlugin({
			filename:'../index.html',
			template:__dirname+'/src/tpl/index.html',
			inject:'body'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings:false
			}
		})
	],
	watch:true
}