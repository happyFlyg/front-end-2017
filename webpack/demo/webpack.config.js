var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
  // 配置入口
  entry: {
      '/js/index':__dirname +'/origin/origin.js'
  },
  // 编译后的文件路径
  output: {

    path: __dirname +'/app', // 文件路径
    filename: '[name].js' // 文件名称
  },
  module: {
    // 编译规则
    loaders: []
  },
  // 辅助的插件
  plugins:[
    new BrowserSyncPlugin({
      host:'localhost', // 实时监听，webpack -w 可以实时更新硬盘中的文件js，css
      port:8080,
      file:'',
      server:{
        baseDir:'./app' // localhost地址对应的文件目录
      }
    })
  ]
}