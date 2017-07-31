<template>
	<div id="header-md" class="padding-md">
		<h3 class="text-white left text-size-lg">{{Title}}</h3>
		<div @click="showleftMenu" v-show="showMenu" id="menu" class="right">
			<img src="../assets/images/menu.png">
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:"header-md",
		props:['show','Title'],
		computed:{
			showMenu(){
				if(this.show=='y') return true;
				if(this.show=='n') return false;
			}
		},
		methods:{
			showleftMenu(){
				this.$store.state.leftmenuShow = true;
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/css/variables.less';
	
	#header-md{
		height:20px;
		line-height: 20px;
		background:linear-gradient(90deg,@green 0%,@turquoise 100%);
	}
</style>