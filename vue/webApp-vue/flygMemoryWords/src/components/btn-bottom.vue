<template>
	<div id="btn-bottom">
		<button id="btn" :class="colorName" class="text-size-md">{{value}}</button>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'btn-bottom',
		props:['value','color','position'],
        computed:{
        	colorName:function(){
        		if(this.color == 'orange'){
        			return this.colorName ='orange'
        		}else if(this.color == 'green'){
        			return  'green'
        		}
        	}
        }
	}
</script>
<style lang="less" scoped>
    @import '../assets/css/variables.less';
    #btn-bottom{
    	overflow: hidden;
    	width:100%;
    	height:50px;
    	text-align:center;
    	padding:10px 0;
    	background-image:url('../assets/images/opacity.png');
    }
   #btn{
   	height:45px;
   	width:80%;
   	color:#fff;
   	border:0;
   	letter-spacing:1px;
   	border-radius:@border-radius
   }
   .orange{
   	background: @orange
   }
   .green{
   	background: @green
   }
</style>