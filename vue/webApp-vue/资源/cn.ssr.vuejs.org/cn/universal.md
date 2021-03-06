

## 书写通用代码

在进一步探索之前，我们花一段时间讨论写能运行在服务端和客户端的通用代码限制。由于用例和平台API不同，我们的代码在不同的运行环境也会有不同的行为。下面复习一些关键的点。

### 服务器数据响应

在仅仅是客户端应用，用户将使用浏览器的新的实例。服务端渲染我们也想一样：每个请求都有一个新的独立的实例，没有跨请求的数据渲染。

因为在实际渲染需要确定，我们需要在服务端`pre-fetching`数据，这时在渲染的时候应用数据已经获得到。意味着 `data reactivity`在服务端不是必须的，默认禁用。禁用`data reactivity`避免了将数据转化为被动对象的性能成本。

### 组件生命周期钩子

因为没有动态更新，所以所有的生命周期钩子仅仅`beforeCreate`和`created`将会在服务端渲染时被调用。这意味着其他生命周期函数例如`beforeMount`或`mounted`将会在客户端执行。

另一个需要注意点是应该避免在`beforeCreate`和`created`产生全局副作用，例如设置时间定时器`setInterval`。在客户端我们可以设置定时器然后在`beforeDestroy`或`destroyed`销毁掉。但是因为在服务端渲染是`destroyed`钩子函数不会被调用，定时器会一直存在。为了避免这种情况，可以把带副作用代码放在在`beforeMount`或`mounted`函数内。

### 访问特定平台的API

通用代码不能假定访问特定于平台的api,所以如果您的代码直接使用`window`或`document`,他们在Nodejs执行时将抛出错误,反之亦然。

目标在服务器和客户端之间共享但使用不同平台API,推荐用通用API去包装特定于平台的实现,或者使用类库帮你做这些。例如,axios是一个在服务器和客户端开放相同的API `HTTP client`。

对于浏览器api,常见的方法是访问它们仅在客户端的生命周期内。

注意,如果一个第三方库并不是通用代码,它可能是难以将其集成到一个server-rendered应用。你可以使它工作通过`mock`一些全局变量,但这是`hacky`,可能会干扰其他类库的环境检测代码。

### 自定义指令

大多数自定义指令直接操作DOM，所以会在服务端渲染时出错。这里有两种方式解决：

1. 选择使用抽象机制组件运行在虚拟DOM替代。例如使用`render`函数
2. 如果有组件不能轻易被组件替换，您可以提供一个“服务器端版本”的使用指令选项当创建服务端渲染时。