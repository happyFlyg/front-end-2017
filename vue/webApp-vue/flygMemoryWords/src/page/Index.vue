<template>
	<div id="index">
	    <header-md Title="CET-4" show="y"></header-md>
	    <leftmenu v-show="this.$store.state.leftmenuShow"></leftmenu>
        <face openId="000021"></face>
        <div class="more"></div>
        <speed class="animated pulse"></speed>
        <!-- btn -->
        <div id="btn" class="clearFix">
        	<div id="btn-left" class="text-size-md">继续计划</div>
        	<div id="btn-right" class="text-size-md">复习加经验</div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {mapState,mapGetters} from 'vuex'
    import headerMd from '../components/header-md.vue'
    import leftmenu from '../components/leftmenu.vue'
    import face from '../components/face.vue'
    import speed from '../components/speed.vue'
	export default{
		name:'index',
		components:{headerMd,leftmenu,face,speed},
		methods:{
			toCreat(){
				this.$router.push({path:'/Creat'})
			}
		},
		computed:{
			...mapGetters(['stime'])
		},
		mounted(){
			console.info('this.stime_____'+this.stime);
			if(this.$parent.come!=0){
				//重写读取
				var xhr,state;
				xhr=new XMLHttpRequest();
				xhr.onreadystatechange=function(){
					if(xhr.readyState==4&&xhr.status==200){
						state=eval('('+ xhr.responseText+')')
					}else{
						//错误信息
					}
				}
				xhr.open('GET','http://'+ this.$store.state.serverIP+'/json/users.php?date='+this.stime,true);
				xhr.send();
				this.$store.state.percent=state.percent;
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/css/variables.less';
	#index{
		height:100%;
		width:100%;
	}
	.more{
		height:56px;
		width:100%;
		background: url('../assets/images/more.png') no-repeat center;
		margin-bottom:10px
	}
	#btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width:80%;
		height: 45px;
		line-height: 45px;
		padding: 10px 10%;
        color:#fff;
        #btn-left,#btn-right{
        	float:left;
        	width:50%;
        	height:100%;
        	text-align: center;
        }
        #btn-left{
        	border-top-left-radius: 20px;
        	border-bottom-left-radius: 20px;
        	background:@green;
        }
        #btn-right{
        	border-top-right-radius: 20px;
        	border-bottom-right-radius: 20px;
        	background:@orange;
        }
	}

</style>
