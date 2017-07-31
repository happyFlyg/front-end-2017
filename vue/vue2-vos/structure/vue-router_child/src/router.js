import Vue frome 'vue'
import VueRouter frome 'vue-router'
Vue.use(VueRouter)
//Vue和VueRouter 首字母必须大写
const first = {
	template: `<div>first内容</div>`
}
const firstFirst = {
	template: `<div>firstFirst内容</div>`
}
const firstSecond = {
	template: `<div>firstSecond内容</div>`
}
const second = {
	template: `<div>second内容</div>`
}
const home = {
		template: `<div>home内容</div>`
	}
//子组件视图模板
const asdf = {
	template: `
	    <div class="sadf">
	        <h2>组件</h2>
	        <router-view></router-view>
	    </div>
	`
}
const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [{
		path: '/',
		component: home
	}, {
		path: '/first',
		component: asdf,
		children:[
		    {path:'/',component:first},
		    {path:'first',component:firstFirst},
		    {path:'second',component:firstSecond}
		]
	}, {
		path: '/second',
		component: second
	}]
})
new Vue({
	router,
	template: `
	    <div id="div">
	        <h1>导航</h1>
	        <ol>
	            <li><router-link to="/"></router-link></li>
	            <li><router-link to="/first">first</router-link></li>
	            <ol>
	                <li><router-link to="/first/first"></router-link></li>
	                <li><router-link to="/first/second"></router-link></li>
	            </ol>
	            <li><router-link to="/second">second</router-link></li>
	        </ol>
	        <router-view></router-view>
	    </div>
	`
}).$mount('#app')