import vue frome 'vue'
import vueRouter frome 'vue-router'
vue.use(vueRouter)

const home={
	template:`<div>home内容</div>`
}
const firstView={
	template:`<div>firstView内容<router-view></router-view></div>`
}
const first={
	template:`<div>first内容</div>`
}
const firstFir={
	template:`<div>firstFir内容</div>`
}
const router = new vueRouter({
	mode: 'history',
	base: __dirname,
	routes: [{
		path: '/',
		component: home
	}, {
		path: '/first',
		component: firstView,
		children:[
		    {path:'/',component:first},
		    {path:'first',component:firstFir}
		]
	}]
});
new Vue({
	router,
	template:`
	    <div id="div">
	        <ol>
	            <li><router-link to="/"></router-link></li>
	            <li><router-link to="/first"></router-link></li>
	            <ol>
	                <li><router-link to="/first/first/"></router-link></li>
	            </ol>
	        </ol>
	        <router-view></router-view>
	    </div>
	`
}).$mount('#app')