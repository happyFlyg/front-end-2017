<template>
	<div id="speed">
	    <div id="main">
	        <div class="tempText">{{percentText}}</div>
	    	<div id="outCir" v-show="outCirShow"></div>
	    	<div id="inCir" v-show="inCirShow"></div>
	    	<div id="gray"></div>
	    	<div id="cirsText">{{percentTextSay}}</div>
	    	<div id="circles">
	    		<div id="percent" class="bg-master-gradient"></div>
	    	</div>
	    </div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'speed',
		data(){
			return{
				outCirShow:true,
				inCirShow:true,
				percentTextSay:'已完成',
				percent:this.$store.state.percent
			}
		},
		computed:{
			percentText:function(){
				if(this.percent==0) this.percentTextSay='点击这里开始'
				return this.percent+ '%'
			}
		},
		methods:{
			change(){
				if(this.percent<50){
					var min=parseInt(180-this.percent*1.8);
					document.getElementById('inCir').style.transform='rotate(-'+ min +'deg)';
				}else{
					var max=parseInt((this.percent-50)*3.6);
					document.getElementById('inCir').style.background='#90d5b9';
					document.getElementById('inCir').style.transform='rotate(-180deg)';
					document.getElementById('outCir').style.transform='rotate('+ max +'deg)';
				}
			}
		},
		mounted:function(){
			this.change()
		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/css/variables.less';
	#main{
		position: absolute;
		left:50%;
		margin-left:-90px
	}
	.bg-master-gradient{
		background:linear-gradient(270deg,@green 0%,@turquoise 100%)
	}
	.tempText{
		color:#fff;
		position: absolute;
		left:15px;
		z-index:80;
		width: 150px;
		text-align:center;
		margin-top:65px;
		font-size:160%
	}
	#outCir,#inCir{
		position: absolute;
		z-index: 4;
		width:180px;
		height:181px;
		margin-top:-1px;
		// transform:rotate(20deg);
	    clip:rect(0px,90px,180px,0px);
		border-radius: 180px;
		background: #f4f4f4
	}

	#inCir{
       z-index: 5;
       height:178px;
	}
	#cirsText{
		position: absolute;
		z-index:20;
		color:#fff;
		margin-top:90px;
		margin: 0 auto;
		width:180px;
		line-height: 210px;
		text-align: center
	}
	#circles{
		position: relative;
		width:155px;
		height:153px;
		padding:10px;
		border-radius:155px;
		border:2px solid #90d5b9;
		background:#90d5b9;
	}
	#percent{
		position: absolute;
		width:150px;
		height:150px;
		border-radius:150%;
		line-height:150px;
		text-align:center;
		color:#fff;
		font-size: 150%;
		z-index:5
	}
</style>