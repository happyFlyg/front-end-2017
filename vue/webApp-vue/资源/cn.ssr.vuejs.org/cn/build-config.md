
## 构建配置

我们将假定您已经知道如何配置仅客户端项目的webpack。SSR的配置项目很大程度上相似,但我们建议将配置分成三个文件:`base`,`client`和`server`。基本配置包含两种环境共享配置,如`output path`,`aliases`和`loaders`。服务端配置和客户端配置可以简单地使用`webpack-merge`扩展基本配置。

### 服务端配置

服务端配置意味着将生成传递给`createBundleRenderer`的服务器包。它应该是这样的:

```javascript
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  // 进入应用程序的服务端入口文件
  entry: '/path/to/entry-server.js',

  // 允许webpack以Node-appropriate方式处理动态引入
  // 同样会让vue-loader在编译vue组件时打包出面向服务端代码
  target: 'node',

  // 包渲染支持source map 
  devtool: 'source-map',

  // 告诉服务端包使用node导出格式
  output: {
    libraryTarget: 'commonjs2'
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // 具体化应用程序的依赖.会使服务端构建更加快速
  // 生成更小的打包文件
  externals: nodeExternals({
    // 不要排除需要webpack处理的依赖
    // 你可以添加更多的文件类型，例如 .vue 文件
    // 你也可以添加全局修改的白名单依赖，例如 polyfills
    whitelist: /\.css$/
  }),

  // 这是一个转换服务端输出为单个json文件的插件
  // 默认的文件名是 `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRServerPlugin()
  ]
})
```

在`vue-ssr-server-bundle.json`文件生成以后，简单的传递文件路径到`createBundleRenderer`:

```javascript
const { createBundleRenderer } = require('vue-server-renderer')
const renderer = createBundleRenderer('/path/to/vue-ssr-server-bundle.json', {
  // ...other renderer options
})
```

或者您也可以把包作为对象传递给`createBundleRenderer`。这是在开发过程中用于热重载,可以参考一个的[HackerNews](https://github.com/vuejs/vue-hackernews-2.0/blob/master/build/setup-dev-server.js)演示设置。

### Externals忠告

注意在`externals`选项中我们已经把CSS文件写入白名单。这是因为从依赖中引入CSS需要`webpack`处理。如果你也引入其他类型的文件同样依赖于`webpack`（例如：*.vue），那么也需要把他们放入白名单中。

如果你设置`runInNewContext: once`或者`runInNewContext: true`，同样也需要把`polyfills`放入白名单，如`babel-polyfill`。因为在使用新的上下文环境模式，服务端代码有自己的全局对象。如果在服务端使用`node 7.6+`并不需要这个。这个确实很简单在客户端入口引入。

### 客户端配置

客户端配置可以在很大程度上和基本配置相同。你需要客户端入口指向客户端文件。除此之外,如果您使用的是`CommonsChunkPlugin`,确保只在客户端配置使用它，因为在服务端包仅需要单个入口。

#### 生成`clientManifest`

> 需要版本 2.3.0+

除了服务端打包，我们也可以生成客户端`manifest`文件。有了客户端`manifest`文件和服务端包，渲染器有了服务端和客户端编译信息。它可以在渲染HTML时自动推断和注入[preload / prefetch](https://css-tricks.com/prefetching-preloading-prebrowsing/)指令和css链接、script标签标记。

有两个好处：

1. 当生成带有hash值的文件名时，它可以取代`html-webpack-plugin`注入正确的资源url。
2. 当利用webpack代码分离特性，渲染一个按需加载的代码块时，我们可以保证最优代码块是预加载/预获取的。并且可以为需要加载的异步模块自动的注入`script`标签，避免客户端瀑布请求提高`TTI(time-to-interactive)`

要使用客户端`manifest`文件，客户端配置可以像下面这样：

```javascript
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  entry: '/path/to/entry-client.js',
  plugins: [
    // 重要: 分离webpack运行时代码到第一个包中
    // 目的是异步代码可以被正确被注入
    // 同样为了更好的缓存`app/vendor`代码
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    // 插件会在输出目录生成`vue-ssr-client-manifest.json`文件
    new VueSSRClientPlugin()
  ]
})
```

然后在页面模板中使用生成的客户端`manifest`:

```javascript
const { createBundleRenderer } = require('vue-server-renderer')

const template = require('fs').readFileSync('/path/to/template.html', 'utf-8')
const serverBundle = require('/path/to/vue-ssr-server-bundle.json')
const clientManifest = require('/path/to/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest
})
```

通过此设置,采用代码分隔的服务端渲染构建HTML将会像这样的(一切都是自动注入):

```javascript
<html>
  <head>
    <!-- chunks used for this render will be preloaded -->
    <link rel="preload" href="/manifest.js" as="script">
    <link rel="preload" href="/main.js" as="script">
    <link rel="preload" href="/0.js" as="script">
    <!-- unused async chunks will be prefetched (lower priority) -->
    <link rel="prefetch" href="/1.js" as="script">
  </head>
  <body>
    <!-- app content -->
    <div data-server-rendered="true"><div>async</div></div>
    <!-- manifest chunk should be first -->
    <script src="/manifest.js"></script>
    <!-- async chunks injected before main chunk -->
    <script src="/0.js"></script>
    <script src="/main.js"></script>
  </body>
</html>`
```

### 手动资源注入

默认情况下,资产注入时自动提供`template`渲染选项。但有时您可能希望更细粒度地控制资产注入到模板,或者你不使用一个模板。在这种情况下你可以通过设置`inject: false`，在创建渲染器时用来手动执行资产注入。

在`renderToString`回调中，传递的`context`对象将会暴露下面的方法:

* `context.renderStyles()`

    它将返回内联`<style>`标记，包含从所有在用于渲染的`*.vue`组件收集出的关键CSS代码。 *。vue组件渲染期间使用。更多细节请参见[CSS Management](https://ssr.vuejs.org/en/css.html)。
    
    如果提供`clientManifest`，那返回的字符串包含`<link rel="stylesheet">`标签，标签指向webpack生成出的css文件(例如通过`extract-text-webpack-plugin`提取css文件或是通过`file-loader`引入)。

* `context.renderState(options?: Object)`

    这个方法返回序列化的`context.state`，返回嵌入`window.__INITIAL_STATE__`的内联脚本。
    
    上下文`state`key值和全局`state`key值都是可以通过传递可选的对象进行定义的。
    
    ```javascript
    context.renderState({
      contextKey: 'myCustomState',
      windowKey: '__MY_STATE__'
    })
    
    // -> <script>window.__MY_STATE__={...}</script>
    ```
* `context.renderResourceHints()`

    * 需要 `clientManifest`
    
    这个方法返回`<link rel="preload/prefetch">`，当前渲染页面所需资源提示，默认为：
    
    * 预加载当前页面所需的`JavaScript`和`CSS`文件
    * 预获取稍后可能需要的异步JavaScript代码块
    
    预加载的文件可以进一步通过`shouldPreload`选项设置。

* `context.getPreloadFiles()`
    
    * 需要 `clientManifest`
    
    这个方法不返回字符串，相反返回文件数组代表预加载的文件资源。这可以用于以通过编程方式执行`HTTP/2`服务端推送。

`template`传递给`createBundleRenderer`后将会使用内插值方式使用`context`,你可以在模板使用下面方法,（使用`inject: false`配置）：

```html
<html>
  <head>
    <!-- 使用三层花括号注入non-HTML-escaped -->
    {{{ renderResourceHints() }}}
    {{{ renderStyles() }}}
  </head>
  <body>
    <!--vue-ssr-outlet-->
    {{{ renderState() }}}
    {{{ renderScripts() }}}
  </body>
</html>
```

如果你不适用模板可以自己连接字符串。