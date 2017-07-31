
## 路由和代码分离

### vue-router路由

您可能已经注意到,我们的服务端代码使用*处理接受任意url。这使我们能够通过URL访问到我们的Vue应用,重用相同的路由配置在客户端和服务端!

推荐使用的官方vue-router。我们首先创建一个路由文件。注意与createApp相似,我们同样需要为每个请求创建新的路由器实例,所以该文件需要导出createRouter函数:

```javascript
// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      // ...
    ]
  })
}
```

更新 app.js

```javascript
// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

export function createApp () {
  // create router instance
  const router = createRouter()

  const app = new Vue({
    // inject router into root Vue instance
    router,
    render: h => h(App)
  })

  // return both the app and the router
  return { app, router }
}
```

现在我们需要在entry-server.js实现服务器端路由逻辑:

```javascirpt
// entry-server.js
import { createApp } from './app'

export default context => {
  // 因为有可能是异步路由钩子或组件,
  // 我们将返回一个promise,让服务器可以等到一切都准备好再渲染
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // 设置服务端路由 location
    router.push(context.url)

    // 等待所有可能的异步组件或钩子
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 没有匹配的路由返回404
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }

      // promise需要返回app实例
      resolve(app)
    }, reject)
  })
}
```

假设服务端已经打包完成(先暂时忽视构建),服务端用法看起来像这样:

```javascript
// server.js
const createApp = require('/path/to/built-server-bundle.js')

server.get('*', (req, res) => {
  const context = { url: req.url }

  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(html)
      }
    })
  })
})

```

### 代码分离

代码分隔,或者延迟加载应用程序的一部分,有助于减少需要下载浏览器的初始渲染资源,并能大大改善大型应用程序包`TTI (time-to-interactive)`。对于首屏关键是`loading just what is needed`。

Vue提供异步组件,结合与[webpack 2支持使用动态导入作为code-split点](https://webpack.js.org/guides/code-splitting-async/),您需要做的是:

```javascript
// changing this...
import Foo from './Foo.vue'

// to this:
const Foo = () => import('./Foo.vue')
```

这将工作在任何情况下,如果你正在建设一个纯客户端Vue应用。然而在使用SSR有一些限制。首先您需要全部去完成所有服务器上的异步组件在开始渲染之前,否则你只会得到一个空的占位符标记。在客户端还需要在开始`hydration`之前做这个,否则客户会遇到内容不匹配错误。

在应用程序任意地点使用异步组件有点棘手(我们在未来可能会改善这种)。然而它能够在路由层面无缝地使用，也就是在路由配置中使用异步组件。因为vue-router会自动解决异步组件匹配路由时。你需要做的是确保使用·`router.onReady`在服务端和客户端。我们已经做了在服务端入口,现在我们只需要更新客户端入口:

```javascript
// entry-client.js

import { createApp } from './app'

const { app, router } = createApp()

router.onReady(() => {
  app.$mount('#app')
})
```

异步组件路由配置的一个例子:

```javascript
// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('./components/Home.vue') },
      { path: '/item/:id', component: () => import('./components/Item.vue') }
    ]
  })
}
```