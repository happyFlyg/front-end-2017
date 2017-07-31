<template>
	<div id="face" class="padding-md">
		<div class="left faceimg padding-r10">
			<img :src="$store.state.headimgurl">
		</div>
		<div class="left userMsg">
			<h3 id="showname" class="text-size-lg">
				{{showname}}
				<notice :num="this.$store.state.notice" v-show="noticeShow" class="notice"></notice>
			</h3>
            <h4>
            	记忆力:<span class="text-orange">{{$store.state.memory}}</span>
            	&nbsp;&nbsp;&nbsp;经验值:<span class="text-green">{{$store.state.xp}}</span>
            </h4>
		</div>
		<div class="clearBoth"></div>
	</div>
</template>
<script type="text/javascript">
    import notice from './notice.vue';
	export default{
		name:'face',
		props:['openId'],
		components:{notice},
		computed:{
			noticeShow(){
				if(this.$store.state.notice==0) return false
				else return true;
			},
			showname(){
				var showname=this.$store.state.name;
				if(showname.length>15) showname=showname.substring(0,8) + '...'
				return showname
			}
		},
		mounted:function(){
			var obj=document.getElementById('showname');
			if(this.$store.state.name<5) obj.style.fontSize = '200%';
		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/css/variables.less';
	.userMsg{
		margin-top:19px
	}
	.notice{
		position: relative;
		top:-10px;
	}
</style>