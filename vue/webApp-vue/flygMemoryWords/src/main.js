// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from '@/store/index'
import router from '@/router/index'
require('!style-loader!css-loader!less-loader!@/assets/css/main.less');
require('!style-loader!css-loader!@/assets/css/animate.min.css');
/* eslint-disable no-new */
var vm = new Vue({
	router,
	store,
	data:{
        examTime:'2018-6-17',
        preExamDay:'30',
        come:0
	},
	template:`
	    <transition name="fade" mode="out-in">
	      <router-view></router-view>
	    </transition>
	`,
	beforeCreate:function(){
		// 和服务器中断连接跳转，
		if(this.$store.state.serverIP=='0') router.push({path:'/error'})
		// 判断是否为注册用户
		if(this.$store.state.newbi == 1){
			router.push({path:'/index'})
		}else{
			router.push({path:'/Creat'})
		}
	}
}).$mount('#app')
