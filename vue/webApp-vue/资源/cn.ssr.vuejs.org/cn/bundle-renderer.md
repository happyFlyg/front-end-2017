
## 包渲染器介绍

### 基本服务端渲染问题

到目前为止,我们已经假定服务端代码包将通过`require`直接使用:

```javascript
const createApp = require('/path/to/built-server-bundle.js')
```

这是显而易见的,当你编辑你的应用程序源代码时必须停止并重新启动服务器。这在开发过程中浪费了生产力。此外,`nodejs`并不能原生支持`source maps`。

### BundleRenderer入口

`vue-server-renderer`提供`createBundleRenderer`API来解决这个问题。通过定制webpack插件,服务端包生成为一种特殊的JSON文件。一旦包渲染器创建,用法和正常的渲染器是一样的,但包渲染器提供了以下好处:

* 内置`source map`支持（在webpack中设置`devtool: 'source-map'`）
* 在开发环境中支持热重载甚至部署(只需阅读更新包然后重新创建渲染器实例)
* 关键的CSS注入（在使用.vue文件情况）:自动内联组件所需的CSS在渲染期间使用。更多的细节请查看[CSS部分](https://ssr.vuejs.org/en/css.html)。
* [`clientManifest`](https://ssr.vuejs.org/en/api.html#clientmanifest)资源注入:自动推断最优预加载和预取指令,和初始渲染所需的代码分割块。


在下一节中我们将讨论如何配置webpack生成构建工具所需的包渲染器,但是现在我们假设我们已经有我们需要的,下面是如何创建使用包的渲染器:

```javascript
const { createBundleRenderer } = require('vue-server-renderer')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 建议设置
  template, // (可选) 模板文件
  clientManifest // (可选) 客户端构建manifest文件
})

// inside a server handler...
server.get('*', (req, res) => {
  const context = { url: req.url }
  // 不需要产生一个应用程序,因为它是通过执行包自动创建的
  // 现在我们的服务器是脱离我们的Vue应用
  renderer.renderToString(context, (err, html) => {
    // 处理异常
    res.end(html)
  })
})
```

在包渲染时`renderToString`会被调用,它会自动执行包导出的函数去创建一个应用程序实例(`context`作为参数)。

注意推荐`runInNewContext`设置为`false or once`。看到[它的API](https://ssr.vuejs.org/en/api.html#runinnewcontext)参考更多细节。