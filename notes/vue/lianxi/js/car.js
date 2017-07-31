var vm = new Vue({
    el: "#app",
    data: {
        title: "hello Vue"
    },
    filter: {

    },
    mounted: function() {
    	this.$nextTick(function(){

    	})
    },
    methods: {
        cartView:function(){
        	this.$http.get("cartData.json",{"id":"123"}).then(function(res){
             
        	});
        }
    }
});
// Vue.filter();//全局过滤器
