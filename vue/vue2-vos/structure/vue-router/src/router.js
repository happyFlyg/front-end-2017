import Vue frome 'vue'
import VueRouter frome 'vue-router'
Vue.use(VueRouter)

const first = {
	template: `<div>first内容</div>`
}

const second = {
	template: `<div>second内容</div>`
}

const home = {
		template: `<div>home内容</div>`
	}
	//路由
const router = new VueRouter({
	mode: 'history', //模式
	base: __dirname, //当前的本地路径
	//路由以数组的形式
	//path中的/是指当前目录 routes 一定是复数形式
	routes: [{
		path: '/',
		component: home
	}, {
		path: '/first',
		component: first
	}, {
		path: '/second',
		component: second
	}, ]

});
//模板   router-link to属性
new Vue({
	router,
	template: `
	<div id="div">
	    <h1>导航</h1>
	    <ul>
	        <li><router-link to="/">home</router-link></li>
	        <li><router-link to="/first">first</router-link></li>
	        <li><router-link to="/second">second</router-link></li>
	    </ul>
	    <router-view></router-view>
	</div>
	`
}).$mount('#app')