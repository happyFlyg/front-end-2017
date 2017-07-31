
## API参考

### `createRenderer([options])`

创建[`Renderer`](#class-renderer)实例，`options`参数可选

```javascript
const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer({ ... })
```

### `createBundleRenderer(bundle[, options])`

创建`BundleRenderer`实例,`serverBundle`参数为服务端代码块，`options`参数可选。

```javascript
const { createBundleRenderer } = require('vue-server-renderer')
const renderer = createBundleRenderer(serverBundle, { ... })
```

`serverBundle`参数可以是下面的一种：

* 生成打包文件的绝对文件(`.js`或`.json`)路径。必须以`\`开始作为文件路径。

* 通过`webpack` + `vue-server-renderer/server-plugin`生成`bundle`对象

* Javascript字符串代码(不建议)

更多的细节参考[服务器打包介绍](https://ssr.vuejs.org/en/bundle-renderer.html)和[构建配置](https://ssr.vuejs.org/en/build-config.html)。

### `Class: Renderer`

* `renderer.renderToString(vm[, context], callback)`

    渲染代码块为一个字符串。上下文对象是可选的。回调是一个典型的Node.js风格回调函数,第一个参数是异常,第二个参数是字符串。

* `renderer.renderToStream(vm[, context])`

    渲染代码块为Node.js的流。上下文对象是可选的。更多细节参考[Streaming](https://ssr.vuejs.org/en/streaming.html)。

### `Class: BundleRenderer`

* `bundleRenderer.renderToString([context, ]callback)`

    渲染代码块为一个字符串。上下文对象是可选的。`callback`参数是典型的Node.js风格回调函数，第一个参数是异常，第二个参数是渲染出的字符串。

* `bundleRenderer.renderToStream([context])`

    渲染代码块为Node.js的流。上下文对象是可选的。更多细节参考[Streaming](https://ssr.vuejs.org/en/streaming.html)。

### Renderer可选项

* #### `template`

    为整个页面的HTML提供模板。模板应该包含`<!--vue-ssr-outlet-->`注释，作为占位符呈现应用程序的内容。
    
    模板还支持使用渲染上下文的基本插值：

    * 对HTML转义使用双括号插值
    * 不对HTML转义使用三括号插值
    
    当在渲染上下文发现下面数据时模板自动注入适当的内容:
    
    * `context.head`: 应该注入页面头部的一些头标签(字符串)
    
    * `context.styles`: 应该注入的页面一些内联CSS(字符串)。注意如果使用`vue-loader` + `vue-style-loader`这个属性将自动填充。
    
    * `context.state`: Vuex初始`store state`(对象)，作为`window.__INITIAL_STATE__`变量内联页面。内联的JSON会自动通过[serialize-javascript](https://github.com/yahoo/serialize-javascript)过滤来阻止XSS攻击。
    
    此外如果提供了`clientManifest`,模板会自动注入以下：
    
    * 渲染器所需的客户端JavaScript和CSS资源(异步模块会自动判断)
    * 渲染页面时最优的`<link rel="preload/prefetch">`资源提示
    
    你可以设置渲染器的`inject: false`禁用所有自动注入
    
    参见：
    
    * [使用页面模板](https://ssr.vuejs.org/en/basic.html#using-a-page-template)
    * [手动资源注入](https://ssr.vuejs.org/en/build-config.html#manual-asset-injection)

* #### `clientManifest`

    * 2.3.0+
    * 仅在`createBundleRenderer`使用
    
    提供通过`vue-server-renderer/server-plugin`生成的客户端`manifest`对象。客户端`manifest `会提供包渲染器自动资源注入HTML模板的正确信息。更多细节,请参见[生成clientManifest](https://ssr.vuejs.org/en/build-config.html#generating-clientmanifest)。

* #### `inject`

    * 2.3.0+
    
    在使用模板时控制是否自动执行注入。默认是`true`。
    
    参见：[手动资源注入](https://ssr.vuejs.org/en/build-config.html#manual-asset-injection)
    
* #### `shouldPreload`

    * 2.3.0+
    
    控制文件是否有`<link rel="preload"`资源提示生成。
    
    默认情况下,只有预加载JavaScript和CSS文件,这是您的应用绝对需要的。
    
    其他类型资源图片或字体,预加载太多可能浪费带宽,甚至会影响性能,因此什么需要预加载将视情况而定。你可以精确的控制预加载通过`shouldPreload`选项:
    
    ```javascript
    const renderer = createBundleRenderer(bundle, {
      template,
      clientManifest,
      shouldPreload: (file, type) => {
        // type 是基于文件扩展来推断的
        // https://fetch.spec.whatwg.org/#concept-request-destination
        if (type === 'script' || type === 'style') {
          return true
        }
        if (type === 'font') {
          // 只预加载 woff2 字体
          return /\.woff2$/.test(file)
        }
        if (type === 'image') {
          // 只预加载重要的图片
          return file === 'hero.jpg'
        }
      }
    })
    ```
    
* #### `runInNewContext`

    * 2.3.0+
    * 仅在`createBundleRenderer`使用
    * 可选：`boolean | 'once'`(`'once'`仅在2.3.1+支持)
    
    默认情况下,为每个渲染器渲染代码包时将创建一个新的V8上下文并且重新执行整个包。这有一些好处——例如,从服务端进程的应用程序代码是孤立的,我们不需要担心文档中提到的[有状态单例问题](https://ssr.vuejs.org/en/structure.html#avoid-stateful-singletons)。然而这种模式有时会带来一些相当大的性能成本,因为重新执行代码块是昂贵的特别是当应用程序变得很大时。
    
    为了向下兼容该选项默认值为`true`,但是推荐使用`runInNewContext: false`或`runInNewContext: 'once'`。
    
    > 在2.3.0版本这个选项有一个bug: `runInNewContext: false`时仍然使用一个单独的全局上下文执行代码块。以下信息假设版本为2.3.1+。
    
    设置`runInNewContext: false`,服务端进程中代码块将会运行在相同的`global`上下文环境中。应用程序中当心修改`global`的代码。
    
    在2.3.1+中设置`runInNewContext: 'once'`,代码块仅会在初始时在单独的`global`上下文中评估。这提供了更好的应用代码隔离性,因为它阻止代码包意外污染服务器进程的`global`对象。警告:
    
    1. 能修改`global`依赖(例如 polyfills)不能体现在这种模式下
    2. 包执行器返回值应该使用不同的全局构造函数,例如代码包发现一个错误不应该是服务端进程的`Error`实例。
    
    参见：[源码结构](https://ssr.vuejs.org/en/structure.html)
    
* #### `basedir`

    * 2.2.0+
    * 仅在`createBundleRenderer`使用
    
    显式地声明服务器包基本目录来解决node_modules依赖性。这只是在你生成的包文件路径与安装的NPM依赖路径不同时使用,或是你的`vue-server-renderer`是以npm-linked到你当前的项目中。
    
* #### `cache`

    提供一个常用[组件缓存](https://ssr.vuejs.org/en/caching.html#component-level-caching)实现。缓存对象必须实现以下接口(使用箭头符号):
    
    ```javascript
    type RenderCache = {
      get: (key: string, cb?: Function) => string | void;
      set: (key: string, val: string) => void;
      has?: (key: string, cb?: Function) => boolean | void;
    };
    ```
    
    一个典型的用法是传入一个[lru-cache](https://github.com/isaacs/node-lru-cache):
    
    ```javascript
    const LRU = require('lru-cache')

    const renderer = createRenderer({
      cache: LRU({
        max: 10000
      })
    })
    ```
    
    注意,缓存对象至少应该实现`get`和`set`。此外如果他们接受第二个参数作为回调那么`get`和`has`可选为异步。这允许缓存使用异步api,如redis客户端:
    
    ```javascript
    const renderer = createRenderer({
      cache: {
        get: (key, cb) => {
          redisClient.get(key, (err, res) => {
            // handle error if any
            cb(res)
          })
        },
        set: (key, val) => {
          redisClient.set(key, val)
        }
      }
    })
    ```
    
* #### `directives`

    允许您为您的自定义指令提供服务器端实现:
    
    ```javascript
    const renderer = createRenderer({
      directives: {
        example (vnode, directiveMeta) {
          // transform vnode based on directive binding metadata
        }
      }
    })
    ```
    作为一个例子,看看[v-show的服务器端实现](https://github.com/vuejs/vue/blob/dev/src/platforms/web/server/directives/show.js)。
    
### Webpack 插件

webpack插件直接作为独立文件提供,可以直接`required`:

```javascript
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
```

生成默认的文件是:

* `vue-ssr-server-bundle.json`服务端插件生成
* `vue-ssr-client-manifest.json`客户端插件生成

在创建插件实例时文件名可以定制:

```javascript
const plugin = new VueSSRServerPlugin({
  filename: 'my-server-bundle.json'
})
```

有关更多信息,请参见[构建配置](https://ssr.vuejs.org/en/build-config.html)。