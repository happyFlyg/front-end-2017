
## 预加载数据和状态

### 数据存储

在服务端渲染时我们基本上是呈现一个应用的“快照”。如果应用程序依赖于一些异步数据,我们开始渲染过程之前这些数据需要`pre-fetched`和`resolved`。

另一个问题是在我们`mount`客户端程序时,相同的数据需要可用,否则客户端应用程序将使用不同`state`和`hydration`导致渲染失败。

为了解决这个问题,所获取的数据需要存在实时视图组件外,一个专用的数据存储,或者一个`state container`。在服务端我们在渲染之前可以预取和填充数据到`store`。此外,我们将序列化和内联`state`到HTML中。客户端存储可以在挂载应用程序之前直接拿起内联`state`。

为此我们将使用官方状态管理类库[Vuex](https://github.com/vuejs/vuex/)。让我们创建一个`store.js`文件,有些基于id获取数据的假逻辑:

```javascript
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 假设我们有一个通用API返回Promises
// 忽视实现细节
import { fetchItem } from './api'

export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem ({ commit }, id) {
        // 通过 store.dispatch()返回 Promise
        // 当数据被获取到的时候我们就可以知道
        return fetchItem(id).then(item => {
          commit('setItem', { id, item })
        })
      }
    },
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    }
  })
}
```

更新 `app.js`

```javascript
// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

export function createApp () {
  // 创建 router and store 实例
  const router = createRouter()
  const store = createStore()

  // 进行同步路由状态作为store的一部分
  sync(store, router)

  // 创建应用程序实例,注入路由和store
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // 暴露应用实例,路由和store
  return { app, router, store }
}
```

## 组件的逻辑搭配

那么我们在哪里地方放置派送数据加载操作的代码?

我们需要获取的数据是由路由访问决定的，也决定了组件渲染。事实上,对于一个给定的路由所需的数据也是该组件渲染所需的。所以很自然把里面的数据抓取逻辑放置路由组件内。

我们将在路由组件暴露自定义静态函数`asyncData`。注意,因为这个函数将在组件实例化之前调用,它不能访问`this`。`store`和`route`信息需要作为参数传递:

```javascript
<!-- Item.vue -->
<template>
  <div>{{ item.title }}</div>
</template>

<script>
export default {
  asyncData ({ store, route }) {
    // return the Promise from the action
    return store.dispatch('fetchItem', route.params.id)
  },

  computed: {
    // display the item from store state.
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  }
}
</script>
```

### 服务端数据加载

在`entry-server.js`我们可以通过`router.getMatchedComponents()`获取匹配的路由,并且调用`asyncData`方法。然后我们需要把`resolved state`添加到`render`上下文环境中。

```javascript
// entry-server.js
import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }

      // 在匹配的路由组件中调用 asyncData()
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预加载钩子完成后，store 将会填入渲染应用程序的state
        // 当我们把 state 附加到上下文中，template会被使用来渲染
        // state将会自动被序列化并作为 window.__INITIAL_STATE__ 注入HTML中
        context.state = store.state

        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
```

当使用`template`,`context.state`会被自动嵌入最终HTML中作为`window.__INITIAL_STATE__`。在客户端,store应该在挂载应用程序之前获得state。

```javascript
// entry-client.js

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
```

### 客户端数据加载

在客户端有两种不同的方式处理数据加载：

1. 在路由导航前获取数据
    
    通过这种策略应用程序将继续留在当前视图,直到即将出现视图所需的数据已经解决。好处是接下来的视图可以直接呈现完整的内容,但是如果数据抓取需要很长时间,用户会觉得“困”在当前视图。如果使用这一策略建议提供一个数据加载指示。
    
    我们可以在客户端实现这个策略，在全局路由钩子中通过检查匹配组件，调用它们`asyncData`函数。注意我们应该在初始路由已经`ready`前注册这个钩子,这样我们没有必要再次获取`server-fetched data`

```javascript
// entry-client.js

// ...省略无关代码

router.onReady(() => {
 // 为处理asyncData添加路由钩子
 // 在初始route后做这个，这样我们不用double-fetch已经有的数据
 // 使用 router.beforeResolve() 目的是所有的异步组件已经resolved
 router.beforeResolve((to, from, next) => {
   const matched = router.getMatchedComponents(to)
   const prevMatched = router.getMatchedComponents(from)

   // 我们只关心没有预渲染的组件,
   // 所以需要比较不同
   let diffed = false
   const activated = matched.filter((c, i) => {
     return diffed || (diffed = (prevMatched[i] !== c))
   })

   if (!activated.length) {
     return next()
   }

   // 这里我们可以触发加载提示

   Promise.all(activated.map(c => {
     if (c.asyncData) {
       return c.asyncData({ store, route: to })
     }
   })).then(() => {

     // 停止加载提示

     next()
   }).catch(next)
 })

 app.$mount('#app')
})
```

2. 在匹配视图渲染完成后获取数据

    这一策略将客户端数据获取的逻辑放在视图组件的`beforeMount`函数。视图会立即切换当导航触发时,应用程序感觉有点反应更迅速。然而接下来的视图不会有完整的数据渲染。因此必要时为每个视图组件设置加载状态。
    
    这里可以设置仅客户端的全局`mixin`:
    
```javascript
Vue.mixin({
 beforeMount () {
   const { asyncData } = this.$options
   if (asyncData) {
     // fetch操作返回 promise
     // 因此在组件中我们可以用`this.dataPromise.then(...)`
     // 获取已经准备好的数据完成下面的操作
     this.dataPromise = asyncData({
       store: this.$store,
       route: this.$route
     })
   }
 }
})
```

两个策略决定最终不同的用户体验,应该选择哪种需要根据实际情形和正在构建的应用程序。但是不管你选择哪种策略,`asyncData`函数应该调用在路由组件重用时(同样的路由,但是`params`或`query`发生了变化。例如从`user/1`到`user/2`)。我们也可以在仅客户端的全局`mixin`处理这个问题:

```javascript
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})
```

### Store 代码分离

在大型应用程序中,我们vuex store 可能会分成多个模块。当然也有可能向相应的路由组件块分离这些模块。假设我们有以下store模块:

```javascript
// store/modules/foo.js
export default {
  namespaced: true,
  // 重要: state 必须是一个函数
  // 才能被实例化多次
  state: () => ({
    count: 0
  }),
  actions: {
    inc: ({ commit }) => commit('inc')
  },
  mutations: {
    inc: state => state.count++
  }
}
```

我们可以使用`store.registerModule`来懒注册这个模块在路由组件的`asyncData`中:

```javascript
// inside a route component
<template>
  <div>{{ fooCount }}</div>
</template>

<script>
// 引入模块替换了`store/index.js`
import fooStoreModule from '../store/modules/foo'

export default {
  asyncData ({ store }) {
    store.registerModule('foo', fooStoreModule)
    return store.dispatch('foo/inc')
  },

  // 重要: 当路由访问多次时避免客户端重复模块注册
  destroyed () {
    this.$store.unregisterModule('foo')
  },

  computed: {
    fooCount () {
      return this.$store.state.foo.count
    }
  }
}
</script>
```

因为当前模块现在依赖路由组件,通过webpack它将进入的路线组件的异步chunk中。

唷,这好多代码!这是因为通用数据抓取`server-rendered`应用中可能是最复杂的问题,我们为更容易进一步发展奠定了基础。一旦建立了样板文件,编写单个组件将是非常愉快的。