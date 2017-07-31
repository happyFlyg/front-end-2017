var webpack = require('webpack');
module.exports = {
	entry: __dirname + "/src/js/index.js",
	output: {
		path: __dirname + "/assets/js",
		filename: "index.js",
		publicPath: "/temp/"
	},
	devServer: {
		contentBase: "./",
		host: "192.168.1.125",
		port: "8080",
		color: true
	},
	module:{
		loaders:[
		   {
		   	test:/\.css$/,
		   	loader:'style-loader!css-loader'
		   },
		   {
		   	test:/\.less$/,
		   	loader:'style!css!less'
		   }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}