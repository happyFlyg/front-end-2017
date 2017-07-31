var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extract_css = new ExtractTextPlugin('css/index.css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: {
		app: __dirname + '/src/js/index.js',
		more: [__dirname + '/src/js/a.js', __dirname + '/src/js/b.js'],
		v: ['jquery']
	},
	output: {
		path: __dirname + '/assets/',
		filename: 'js/[name].js',
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
			loader: 'style-loader!css-loader'
		},{
			test:/\.png|.jpg|.jpeg$/,
			loader:'url-loader?limit=1000&name=/assets/images/[hash:8].[name].[ext]'
		},{
			test:/\.html$/,
			loader:'html-loader'
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		extract_css,
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: __dirname + '/src/tpl/index.html',
			inject: 'body'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		//下面两个是把jquery分离出来的
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		// new webpack.optimize.CommonsChunkPlugin('v', 'lib/jquery.min.js')
		new webpack.optimize.CommonsChunkPlugin({
			names:['a','b']
		})
		
	],
	//下面是另外一种分离js写法，不常用
	externals: {
		jquery: "http://lib.baidu.com/jquery/1.9.1/jquery.min.js"
	},
	resolve:{
		root:'d:/js/',//一定要用绝对路径
		extensions:['','.js'],//''代表所有
		alias:{
			appAdd:'add.js'
		}
	},
	watch: true
}