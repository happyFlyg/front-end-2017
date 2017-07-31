
## Head管理

类似于资源注入，head管理遵循相同的想法:我们可以在组件的生命周期中动态地将数据附加到渲染`context`,然后在`template`中插入这些数据。

> 在>=2.3.2 版本中,您可以在组件内通过`this.$ssrContext`直接访问的SSR上下文。在旧版本你需要传递到createApp()手动注入SSR上下文并且暴露在根实例的`$options`，子组件可以通过`this.$root.$options.ssrContext`访问它。

我们可以一个简单的`mixin`去完成标题管理:

```javascript
// title-mixin.js

function getTitle (vm) {
  // 组件可以简单提供`title`选项
  // 可以是字符串也可以是函数
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

const serverTitleMixin = {
  created () {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = title
    }
  }
}

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
  }
}

// VUE_ENV 会通过webpack.DefinePlugin注入 
export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin
```

现在一个路由组件可以利用这个来控制文档标题:

```javascript
// Item.vue
export default {
  mixins: [titleMixin],
  title () {
    return this.item.title
  }

  asyncData ({ store, route }) {
    return store.dispatch('fetchItem', route.params.id)
  },

  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  }
}
```

传递给打包器的模板中：

```javascript
<html>
  <head>
    <title>{{ title }}</title>
  </head>
  <body>
    ...
  </body>
</html>
```

注意：

* 使用双花括号（HTML-escaped interpolation)）来避免 XSS 攻击
* 在创建上下文对象时你需要提供一个默认的title，防止没有组件设置title。

使用相同的策略，你可以轻松的扩展成一个通用的`head`管理工具类。