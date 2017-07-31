
## 缓存

虽然Vue的SSR非常快,但它比不上纯粹基于字符串模板的性能，因为创建组件实例和虚拟DOM节点需要成本。在这种情况下,SSR性能是至关重要的,明智地利用缓存策略可以大大提高响应时间,减少服务器的负载。

### 页面级别缓存

服务端渲染的应用大多依赖于外部数据，内容是天生动态的,不能长时间被缓存。但是如果没有内容没有用户特殊性(例如相同的URL为所有的用户呈现相同的内容),我们可以利用[micro-caching](https://www.nginx.com/blog/benefits-of-microcaching-nginx/)策略大幅度提高我们的应用程序处理高流量的能力。

这通常是在`Nginx`层完成,但是我们也可以在`node.js`实现它:

```javascript
const microCache = LRU({
  max: 100,
  maxAge: 1000 // 重要: 一秒后失效
})

const isCacheable = req => {
  // 实现检查是否特定用户请求的逻辑
  // 只有非用户特殊性页面才会缓存
}

server.get('*', (req, res) => {
  const cacheable = isCacheable(req)
  if (cacheable) {
    const hit = microCache.get(req.url)
    if (hit) {
      return res.end(hit)
    }
  }

  renderer.renderToString((err, html) => {
    res.end(html)
    if (cacheable) {
      microCache.set(req.url, html)
    }
  })
})
```

因为缓存的内容只有一秒,用户不会看到过时的内容。然而这意味着服务器每秒最多只执行一个完整渲染缓存的页面。

### 组件缓存

`vue-server-renderer`已经支持内部组件缓存。在创建渲染器时你需要提供一个[缓存实现](https://ssr.vuejs.org/en/api.html#cache)用来启用它。典型的用法是传入[lru-cache](https://github.com/isaacs/node-lru-cache):

```javascript
const LRU = require('lru-cache')

const renderer = createRenderer({
  cache: LRU({
    max: 10000,
    maxAge: ...
  })
})
```

你可以缓存组件通过实现`serverCacheKey`函数：

```javascript
export default {
  name: 'item', // 必需
  props: ['item'],
  serverCacheKey: props => props.item.id,
  render (h) {
    return h('div', this.item.id)
  }
}
```

注意需要缓存的组件还必须定义一个唯一的`"name"`选项。每一缓存组件关键就是一个唯一的名称:你不需要担心两个组件返回相同的key。

从`serverCacheKey`返回的key应包含足够的信息来表现渲染结果各方面。如果渲染结果仅仅取决于`props.item.id`，上面是一个很好的实现。然而如果随着时间的推移使用相同id的`item`可能会改变,或者渲染结果还依赖于另一个`prop`,那么您需要考虑其他变量然后修改`getCacheKey`实现。

返回一个常量将导致组件总是被缓存,这对于纯静态组件来说很好。

###　何时使用组件缓存

如果在渲染期间`renderer`命中缓存组件,它将直接重用整个子树的缓存结果。这意味着在下面情况下你不应该缓存组件:

* 它有可能依赖于全局状态的子组件。
* 它有可能在渲染上下文产生副作用的子组件。

组件缓存在解决性能瓶颈时应小心应用。在大多数情况下,你不应该、不需要缓存单实例组件。最常见的类型的组件,适用于缓存大量重复`v-for`列表。由于这些组件通常是由数据库中的对象集合驱动,他们可以利用一个简单的缓存策略:使用他们惟一的id + 最后更新的时间戳生成缓存key

`serverCacheKey: props => props.item.id + '::' + props.item.last_updated`