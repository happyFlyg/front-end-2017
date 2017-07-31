<template>
	<div id="CreatSuccess">
        <header-md Title="CET-4" show="n"></header-md>
        <p class="text-size-lg padding-lg">注册成功</p>
        <span class="text-orange padding-r10">+600</span>经验值
        <btn-bottom @click.native="toIndex" color="orange" value="查看计划" class="btnBottom"></btn-bottom>
	</span>
        </div>
</template>
<script type="text/javascript">
import headerMd from '../components/header-md.vue';
import btnBottom from '../components/btn-bottom.vue';
	export default{
        name:'CreatSuccess',
        components:{headerMd,btnBottom},
        methods:{
          toIndex:function(){
                this.$router.push({path:'/index'});
          }
        }
	}
</script>
<style lang="less">
    @import '../assets/css/variables.less';
    #CreatSuccess{
        text-align: center;
    }

</style>