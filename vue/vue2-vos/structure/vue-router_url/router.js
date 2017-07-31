import Vue frome 'vue'
import VueRouter frome 'vue-router'
Vue.use(VueRouter)

const routes=[
    {path:'/'},
    {path:'/params/:aaa/:bbb'},
    {path:'/params/:id(\\d+)'}
]
const router = new VueRouter({
    mode:'history',
    base:__dirname,
    routes
})
new Vue({
	router,
	template:`
	    <div>
	        <h1>good morning</h1>
	        <ul>
	            <li><router-link to="/">/</router-link></li>
	            <li><router-link to="/params/111/222">/params/111/222</router-link></li>
	            <li><router-link to="/params/666">/params/666</router-link></li>
	        </ul>
	        <p>show</p>
	        <pre>
	            <code>{{ JSON.stringify($route,null,2)}}</code>
	        </pre>
	    </div>
	`
}).$mount('#app')