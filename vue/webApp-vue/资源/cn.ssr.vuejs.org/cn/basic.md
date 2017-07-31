
## 基本用法

### 安装

`npm install vue vue-server-renderer --save`

在整个指南中我们将使用NPM,可以随时用[yarn](https://yarnpkg.com/en/)替换。

**注意：**

* 推荐使用的Node.js 6+ 版本
* `vue-server-renderer`和`vue`必须匹配相应版本
* `vue-server-renderer`依赖于Node.js原生模块,因此只能用于Node.js。在未来我们可以提供一个简单的构建,可以运行在其他JavaScript`runtimes`。

### 渲染Vue实例

```javascript
// Step 1: 创建vue实例
const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})

// Step 2: 创建renderer
const renderer = require('vue-server-renderer').createRenderer()

// Step 3: 渲染Vue实例到HTML
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
  // => <div data-server-rendered="true">hello world</div>
})
```

### 和服务端整合

使用Node.js内置服务器是很简单的,例如[Express](https://expressjs.com/):

`npm install express --save`

```javascript
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>The visited URL is: {{ url }}</div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8080)
```

### 使用模板页面

当你渲染Vue应用,渲染器只生成应用程序的元素。在这个例子中我们使用额外的HTML页面包装输出。

简化这个问题,创建渲染器时您可以直接提供一个模板页面。大多数时候我们将把页面模板放在文件内,例如`index.template.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head><title>Hello</title></head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
```

注意`<!——vue-ssr-outlet-->`注释——这就是你应用程序元素将被注入的地方。

我们可以读取并且传递文件到Vue渲染器:

```javascript
const renderer = createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

renderer.renderToString(app, (err, html) => {
  console.log(html) // 应用程序内容注入页面.
})
```

### 插值模板

模板也支持简单插值,参考下面的模板:

```html
<html>
  <head>
    <title>{{ title }}</title>
    {{{ meta }}}
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
```

我们可以通过传递`render context object`作为`renderToString`的第二个参数提供插值数据作。

```javascript
const context = {
  title: 'hello',
  meta: `
    <meta ...>
    <meta ...>
  `
}

renderer.renderToString(app, context, (err, html) => {
  // page title will be "hello"
  // with meta tags injected
})
```

`context`对象也可以与Vue应用实例共享,允许组件动态注册模板插值数据。

此外,模板支持一些高级特性,比如:

* 在使用`*.vue`组件时自动注入关键的CSS
* 在使用`clientManifest`时会自动注入`asset`链接和资源提示
* 在内嵌Vuex state时，可以自动注入并防止`XSS`攻击

当我们介绍相关的概念我们将讨论这些。