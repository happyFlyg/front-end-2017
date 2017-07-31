var webpack=require('webpack');
var extractTextPlugin=require('extract-text-webpack-plugin');
var extract_css=new extractTextPlugin('css/index.css');
module.exports = {
	entry: __dirname + '/src/js/index.js',
	output: {
		path: __dirname + '/assets/',
		filename: 'js/index.js',
		// publicPath: '/assets/'
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
			loader: extract_css.extract("style-loader","css-loader")
		}]
	},
	plugins: [
	   new webpack.HotModuleReplacementPlugin(),
	   extract_css,
	   new HtmlWebpackPlugin({
	   	//不建议写title，直接在html里面写
	   	title:'liaoli',
	   	filename:'../index.html',
	   	//主机一个人用的话 写绝对路径，多人的话写相对路径，权限问题
	   	template:__dirname+ '/src/tpl/index.html',
	   	//script生成后的位置
	   	inject:'body',
	   	//尽量少定义信息，不然速度会很慢的
	   	info:'hello template'
	   })
	]
}