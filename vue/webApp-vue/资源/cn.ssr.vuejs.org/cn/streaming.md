
对于基础渲染器和包渲染器来说,`vue-server-renderer`都支持开箱即用的流式渲染。你所需要做的是用`renderToStream`替换`renderToString`:

`const stream = renderer.renderToStream(context)`

返回的数据是nodejs的[stream](https://nodejs.org/api/stream.html):

```javascript
let html = ''

stream.on('data', data => {
  html += data.toString()
})

stream.on('end', () => {
  console.log(html) // render complete
})

stream.on('error', err => {
  // handle error...
})
```

### 流式渲染说明

在流式渲染模式中当渲染器遍历虚拟DOM树时，数据需要尽快的获取。这意味着我们可以更早得到首屏代码块,更快的发送给客户端。

然而当第一个数据块发送时,子组件甚至没有实例化,同样他们的生命周期也不会钩被调用。这意味着如果子组件需要在其生命周期的钩子附加数据到渲染上下文,在流启动时这些数据是不可用的。因为大量的上下文信息(如头信息或内联CSS)需要在应用程序的元素前出现,在开始使用这些上下文数据之前我们不得不等到流完成。

因此如果你在组件生命周期的钩子内依赖上下文数据不推荐使用流渲染模式。