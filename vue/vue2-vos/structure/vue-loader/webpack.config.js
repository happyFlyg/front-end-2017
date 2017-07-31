var webpack = require('webpack');
var Vue=require('vue');
var extractTextPlugin = require('extract-text-webpack-plugin');
var extractCss = new ExtractTextPlugin('css/index.css');
module.exports = {
	entry: {
		app: __dirname + '/src/js/index.js'/*,
		more: [__dirname + '/src/js/a.js', __dirname + '/src/js/b.js'],
		v: ['jquery']*/
	},
	output: {
		path: __dirname + '/assets/',
		filename: 'js/[name].js',
		//publicPath:'/assets/'
	},
	devServer: {
		contentBase: './',
		host: '192.168.1.10',
		port: '8080',
		color: true
	},
	module: {
		loaders: [{
             test:/\.vue$/,
             loader:'vue'
		}, {
			test: /\.json$/,
			loader: 'json'
		}/*, {
			test: /\.css$/,
			loader: extractCss.extract('style-loader', 'css-loader')
		}*/]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		extractCss,
		new HtmlWebpackPlugin({
			title: 'flyg',
			filename: '../index.html',
			template: __dirname + '/src/tpl/index.html',
			inject: 'body',
			info: 'hello flyg'
		})/*,
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings:false
			}
		}),
		new webpack.ProvidePlugin({
			$:'jquery'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names:['a','b']
		})*/
	]
}