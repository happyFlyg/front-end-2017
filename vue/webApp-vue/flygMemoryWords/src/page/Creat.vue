<template>
	<div  id="creat">
	    <header-lg bigTitle="CET-4" noteTitle="四级英语单词记忆管理"></header-lg>
	    <div class="text-text padding-md">
	    	<p class="text-size-md">Hi,</p>
	    	<p class="text-indent">
	    		亲爱的你，距离大学英语四级（COL-LEGE ENGLISH TEST 4/6）还有 <span>365</span> 天,根据考试大纲要求，你需要记忆<span>3441</span> 个单词和 <span>360</span> 个短语。你每天需要记忆<span>12</span> 个单词。让我帮你规划的记忆管理。

	    	</p>
	    	<p class="text-indent">
	    		当然你不会感觉到枯燥，养成式记忆办法，规划了单词的遗忘曲线，同时，你可以邀请更多的小伙伴一起参与，或加入更多社区。有趣的单词接龙，俚语猜猜看，作文漂流瓶，更多的活动游戏美哒哒的学英语吧。
	    	</p>
	    	<p class="text-indent">
	    		当然你不会感觉到枯燥，养成式记忆办法，规划了单词的遗忘曲线，同时，你可以邀请更多的小伙伴一起参与，或加入更多社区。有趣的单词接龙，俚语猜猜看，作文漂流瓶，更多的活动游戏美哒哒的学英语吧。
	    	</p>
	    	<p class="text-indent">
	    		当然你不会感觉到枯燥，养成式记忆办法，规划了单词的遗忘曲线，同时，你可以邀请更多的小伙伴一起参与，或加入更多社区。有趣的单词接龙，俚语猜猜看，作文漂流瓶，更多的活动游戏美哒哒的学英语吧。
	    	</p>
	    	<p class="text-indent">
	    		当然你不会感觉到枯燥，养成式记忆办法，规划了单词的遗忘曲线，同时，你可以邀请更多的小伙伴一起参与，或加入更多社区。有趣的单词接龙，俚语猜猜看，作文漂流瓶，更多的活动游戏美哒哒的学英语吧。
	    	</p>
	    	<p class="text-indent">
	    		当然你不会感觉到枯燥，养成式记忆办法，规划了单词的遗忘曲线，同时，你可以邀请更多的小伙伴一起参与，或加入更多社区。有趣的单词接龙，俚语猜猜看，作文漂流瓶，更多的活动游戏美哒哒的学英语吧。
	    	</p>
	    	<p class="text-indent">
	    		当然你不会感觉到枯燥，养成式记忆办法，规划了单词的遗忘曲线，同时，你可以邀请更多的小伙伴一起参与，或加入更多社区。有趣的单词接龙，俚语猜猜看，作文漂流瓶，更多的活动游戏美哒哒的学英语吧。
	    	</p>
	    	<p class="text-indent">
	    		当然你不会感觉到枯燥，养成式记忆办法，规划了单词的遗忘曲线，同时，你可以邀请更多的小伙伴一起参与，或加入更多社区。有趣的单词接龙，俚语猜猜看，作文漂流瓶，更多的活动游戏美哒哒的学英语吧。
	    	</p>
	    	<p class="text-indent">
	    		当然你不会感觉到枯燥，养成式记忆办法，规划了单词的遗忘曲线，同时，你可以邀请更多的小伙伴一起参与，或加入更多社区。有趣的单词接龙，俚语猜猜看，作文漂流瓶，更多的活动游戏美哒哒的学英语吧。
	    	</p>
	    	<p class="text-indent">
	    		当然你不会感觉到枯燥，养成式记忆办法，规划了单词的遗忘曲线，同时，你可以邀请更多的小伙伴一起参与，或加入更多社区。有趣的单词接龙，俚语猜猜看，作文漂流瓶，更多的活动游戏美哒哒的学英语吧。
	    	</p>
	    	<p class="text-indent">
	    		当然你不会感觉到枯燥，养成式记忆办法，规划了单词的遗忘曲线，同时，你可以邀请更多的小伙伴一起参与，或加入更多社区。有趣的单词接龙，俚语猜猜看，作文漂流瓶，更多的活动游戏美哒哒的学英语吧。
	    	</p>

	    	<p class="text-align-right">flyg</p>
	    </div>
	    <btn-bottom @click.native="toCreatSlect" value="创建计划" color="orange" class="btnBottom"></btn-bottom>
	</div>
</template>
<script>
    import headerLg from '../components/header-lg.vue';
    import btnBottom from '../components/btn-bottom.vue';
	export default{
		name:'creat',
		components:{headerLg,btnBottom},
		methods:{
			toCreatSlect:function(){
				this.$router.push({path:'/toCreatSlect'})
			}
		}
	}
</script>
<style lang="less" scoped>
@import '../assets/css/variables.less';	
#creat{
	height:100%;
	width:100%;
	font-size:100%;
}
p{
	margin-bottom:10px;
	line-height:150%
}
</style>
