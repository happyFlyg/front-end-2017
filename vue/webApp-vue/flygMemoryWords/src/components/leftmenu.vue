<template>
	<div id="leftmenu">
	    <div id="menu" class="padding-md text-align-center text-white">
	    	<h2>CET-4</h2>
	    	<h3 class="text-size-md">四级单词记忆管理</h3>
	    </div>
		<div id="mask" @click="closeMenu"></div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'leftmenu',
		methods:{
			closeMenu:function(){
				this.$store.state.leftmenuShow = false;
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/css/variables.less';
	#menu{
		z-index:100;
        width:70%;
		height:100%;
		position: fixed;
		left:0;
		top:0;
		background: @gray-dark;
		h2{
			font-size:260%
		}
	}
	#mask{
		z-index:99;
		width:100%;
		height:100%;
		position: fixed;
		left:0;
		top:0;
		background: @black;
		opacity:0.2
	}
</style>