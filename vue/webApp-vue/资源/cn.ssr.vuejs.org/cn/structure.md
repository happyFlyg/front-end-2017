
## 源码结构

### 避免单一状态

当写仅是客户端代码时，我们经常面对的是每次代码都会在一个新的环境中运行。但是 nodejs 服务是长时间运行的进程。当我们的代码是必须的，它会执行一次并保存在内存中。这意味着如果你创建一个单例对象,这将是每个传入请求之间共享。

看到在基本的例子中,我们为每个请求创建一个新的根Vue实例。这类似于每个用户将使用新的实例应用在自己的浏览器。如果我们使用一个共享实例跨多个请求,它将容易导致cross-request污染状态。

相对于直接创建一个应用程序实例,我们应该暴露工厂函数,可以反复执行为每个请求创建新应用程序实例:

```javascript
// app.js
const Vue = require('vue')

module.exports = function createApp (context) {
  return new Vue({
    data: {
      url: context.url
    },
    template: `<div>The visited URL is: {{ url }}</div>`
  })
}
```

我们现在的服务端代码就变成:

```javascript
// server.js
const createApp = require('./app')

server.get('*', (req, res) => {
  const context = { url: req.url }
  const app = createApp(context)

  renderer.renderToString(app, (err, html) => {
    // handle error...
    res.end(html)
  })
})
```

同样的规则也适用于`router`、`store`和`event bus`实例。相对于直接从一个模块导出并且引入应用程序,您需要在`createApp`创建一个新的实例并且从根Vue实例和注入。

> 这个约束可以消除在使用{ runInNewContext: true}的`bundle renderer`时,但是它有一些显著的性能成本,因为需要为每个请求创建一个新的vm上下文。

### 构建步骤介绍

到目前为止,我们还没有讨论如何实现相同的Vue应用到客户端。要做到这一点,我们需要使用webpack打包Vue应用。事实上,我们也想使用webpack打包Vue服务端上的应用程序,因为:

* 典型Vue应用构建使用`webpack`和`vue-loader`,和许多webpack-specific功能如通过`file-loader`引入文件,导入CSS通过css-loader不会直接在nodejs中运行。
* 尽管最新版本的nodejs完全支持ES2015特性,我们仍然需要编译客户端代码迎合老版本浏览器客户端。这又涉及到一个构建的步骤。

基本思想是我们将使用webpack打包我们的应用程序在客户端和服务端。服务端包将会被服务器使用,用于SSR,而客户端包被发送到浏览器。 

![](https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

我们将在后面的章节讨论设置的细节,现在让我们假设我们有构建设置我们可以写Vue应用程序代码和启用webpack。

### Webpack下的代码结构

现在我们正在使用webpack处理服务器和客户端的应用,我们大部分的源代码可以编写为通用的方式,访问所有webpack-powered功能。同时当编写通用代码有很多东西你应该记住。

一个简单的项目看起来像这样:

```javascript
src
├── components
│   ├── Foo.vue
│   ├── Bar.vue
│   └── Baz.vue
├── App.vue
├── app.js # universal entry
├── entry-client.js # runs in browser only
└── entry-server.js # runs on server only
```

### app.js

app.js是我们程序的通用入口。在仅客户端的应用程序中,我们在这个文件创建根Vue实例,直接挂载到DOM。然而对于SSRapp.js仅仅简单导出createApp函数:

```javascript
import Vue from 'vue'
import App from './App.vue'

// export a factory function for creating fresh app, router and store
// instances
export function createApp () {
  const app = new Vue({
    // the root instance simply renders the App component.
    render: h => h(App)
  })
  return { app }
}
```

### entry-client.js

客户端入口简单地创建应用程序并将其挂载DOM:

```javascript
import { createApp } from './app'

// client-specific bootstrapping logic...

const { app } = createApp()

// this assumes App.vue template root element has id="app"
app.$mount('#app')
```

### entry-server.js

服务端入口使用默认导出函数,可以每次渲染反复调用。此时并没有比其他创建并返回应用程序实例做的更多，但稍后我们将执行服务器端路由匹配和数据预取逻辑放置在这。

```javascript
import { createApp } from './app'

export default context => {
  const { app } = createApp()
  return app
}
```