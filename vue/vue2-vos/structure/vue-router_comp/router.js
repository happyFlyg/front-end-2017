import Vue frome 'vue'
import VueRouter frome 'vue-router'
Vue.use(VueRouter)

const home = {
	template: `<div>home内容</div>`
}
const hehe = {
	template: `<div>hehe内容</div>`
}
const first = {
	template: `<div>first内容</div>`
}
const second = {
	template: `<div>second内容</div>`
}
const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [{
		path: '/',
		components:{
			default:home,
			left:first,
			right:second
		}
	}, {
		path: '/fir',
		components:{
			default:hehe,
			left:first,
			right:second
		}
	}]
});
new Vue({
	router,
	template: `
	    <div id="main">
	        <ol>
	            <li><router-link to="/">/</router-link></li>
	            <li><router-link to="/fir">/fir</router-link><li>
	        </ol>
	        <router-view></router-view>
	        <router-view name="left" style="float:left;width:50%;height:300px;background:#ff6600"></router-view>
	        <router-view name="right" style="float:left;width:50%;height:300px;background:#ff6060"></router-view>
	    </div>
	`
}).$mount('#app')