var App=require('./app.vue');
new Vue({
	el:'#main',
	data:{
		msg:'hello flyg'
	},
	render: x => x(App),
})