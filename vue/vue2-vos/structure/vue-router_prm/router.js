import Vue frome 'vue'
import VueRouter frome 'vue-router'
Vue.use(VueRouter)

const home={
	template:`<div>home内容</div>`
}
const firstView={
	template:`<div><h2>子菜单</h2><router-view></router-view></div>`
}
const first={
	template:`<div>first内容</div>`
}
const firstFir={
	template:`<div>firstFir内容{{$route.params.id}}</div>`
}
const firstSec={
	template:`<div>firstSec内容</div>`
}
const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [{
		path: '/',
		name:'home',
		component: home
	}, {
		path: '/first',
		name:'first',
		component: firstView,
		children:[ 
		    {path:'/',component:first},
		    {path:'first',name:'firstFirst',component:firstFir},
		    {path:'second',component:firstSec}
		]
	}]
})
new Vue({
	router,
	template:`
	    <div id="div">
	        <p>{{ $route.name }}</p>
	        <ol>
	            <li><router-link to="/"></router-link></li>
	            <li><router-link to="/first"></router-link></li>
	            <ol>
	                <li><router-link :to="{name:'firstFirst',params:{id:123}}"></router-link></li>
	                <li><router-link to="/first/second"></router-link></li>
	            </ol>
	        </ol>
	        <router-view></router-view>
	    </div>
	`
}).$mount('#app')