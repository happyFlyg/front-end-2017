

## CSS管理

推荐简单地管理CSS方法是使用`<style>` 在单`*.vue`文件组件内，它提供了：

* 可并列的，组件范围内CSS
* 可以利用预处理器或PostCSS
* 开发期间热重载

更重要的是,`vue-style-loader` 内部使用`vue-loader`，有些服务端渲染的特性：

* 客户端服务端通用代码
* 使用`bundleRenderer`时自动获取临界CSS

如果在服务端渲染期间使用，组件的CSS会被收集并且内联进HTML（如果使用`template`选项会自动处理）。在客户端如果组件被首次使用时，`vue-style-loader`将会检测是否存在服务端内联的CSS，如果没有将会以`<style>`标签动态注入。

* 通用CSS分离

使用`extract-text-webpack-plugin`从主要代码中分离出单个CSS文件（使用`template`选项自动注入）。这样可以缓存分离出的文件。如果有很多公用的CSS建议这样做。

在异步组件的CSS通过`vue-style-loader`处理，仍然作为JavaScript字符串内联。

### 开启CSS分离

使用`vue-loader`的`extractCSS`选项从`*.vue`文件中分离CSS（需要`vue-loader>=12.0.0`）:

```javascript
// webpack.config.js
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 仅在生产环境使用CSS分离
// 可以在开发环境中使用热重载
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // 开启 CSS 分离
          extractCSS: isProduction
        }
      },
      // ...
    ]
  },
  plugins: isProduction
    // 添加插件
    ? [new ExtractTextPlugin({ filename: 'common.[chunkhash].css' })]
    : []
}
```
注意以上配置仅适用于`.vue`文件，但是你可以使用`<style src="./foo.css">`导入额外的CSS到Vue组件内。

如果你通过JavaScript导入CSS（例如`import 'foo.css'`），你需要配置合适的`loaders`:

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        // 重要: 使用 vue-style-loader 替换 style-loader
        use: isProduction
          ? ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader']
      }
    ]
  },
  // ...
}
```

### 从NPM依赖中导入样式

在从NPM的依赖导入CSS需要注意几件事情：

1. 在服务端构建时不能分离
2. 如果通过`CommonsChunkPlugin`和`extract-text-webpack-plugin`分离CSS和vendor块，当分离的CSS存在分离的vendors块中会遇到问题。为了解决这个问题，避免在vendor块中包含CSS文件。一个客户端webpack配置是：

```javascript
module.exports = {
 // ...
 plugins: [
   // 通常为了更好的缓存将提取依赖到一个vendor代码块中
   new webpack.optimize.CommonsChunkPlugin({
     name: 'vendor',
     minChunks: function (module) {
       // 模块将会打包进 vendor 包中，当...
       return (
         // 如果模块存在 node_modules 中
         /node_modules/.test(module.context) &&
         // 如果请求的是CSS文件则不会分离
         !/\.css$/.test(module.request)
       )
     }
   }),
   // 分离webpack的runtime文件 和 manifest文件
   new webpack.optimize.CommonsChunkPlugin({
     name: 'manifest'
   }),
   // ...
 ]
}
```