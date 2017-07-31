
## 客户端融合

在`entry-client.js`中我们简单的挂载应用程序如下：

```javascript
// 假设 App.vue 模板根元素 id="app"
app.$mount('#app')
```

由于服务器已经渲染元素,我们显然不想扔掉,并重新创建DOM元素。相反我们希望融合静态`markup`和交互。

如果你检查服务端渲染输出,您将注意到应用程序的根元素有一个特殊的属性:

```javascript
<div id="app" data-server-rendered="true">
```

`data-server-rendered`特殊属性允许客户端Vue知道元素由服务器渲染并且应该用`hydration`模式挂载。

在开发模式中,Vue将维护客户端生成的虚拟DOM树匹配来自服务器的DOM结构。如果不匹配将进行融合,抛弃现有的DOM并从头开始渲染。在生产模式下为了最大性能,这种声明是禁用的。

### Hydration忠告

有一件事需要注意的在使用`SSR+client`hydration模式是一些特殊的HTML结构会被浏览器改变。例如当你写这个Vue模板:

```
<table>
  <tr><td>hi</td></tr>
</table>
```

浏览器会自动注入`<tbody>` 到`<table>`内,然而Vue生成的虚拟DOM不包含`<tbody>`,这将导致一个不匹配。为了确保正确的匹配,你应该在模板内编写有效的HTML。