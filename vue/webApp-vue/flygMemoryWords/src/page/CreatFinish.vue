<template>
    <div id="CreatFinish">
        <header-lg bigTitle="CET-4" noteTitle="四级英语单词记忆管理"></header-lg>
        <div class="padding-md">
        	<p class="text-size-md ">真实姓名</p>
        	<input type="text" name="userName" class="inputs  mar-top-10" v-model='userName' onkeyup="this.value = this.value.replace(/\s/,'')">
        	<p class="text-size-md mar-top-20">注册手机号</p>
        	<input type="text" name="userPhone" class="inputs  mar-top-10" v-model='userPhone' onkeyup="this.value = this.value.replace(/\D/g,'')">
            <ul class="mar-top-20">
                    <li @click="selectSex('data-0')" id="data-0" class="radio-sm-wrap radio-noactive">
                        <div class="radio-sm font-size-lg">男</div>
                    </li>
                    <li @click="selectSex('data-1')" id="data-1" class="radio-sm-wrap radio-active">
                        <div class="radio-sm font-size-lg">女</div>
                    </li>
                </ul>
        </div>
        <h2>{{this.sex}}</h2>
        <btn-bottom @click.native="toCreatSuccess" value="完成注册" color="orange" class="btnBottom"></btn-bottom>
    </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import headerLg from '../components/header-lg.vue';
import btnBottom from '../components/btn-bottom.vue';
export default {
    name: 'CreatFinish',
    components: {headerLg,btnBottom},
    data(){
    	return{
            userName:'flyg',
            userPhone:'1318888888',
            sex:'1'
    	}
    },
    methods:{
    	
    	selectSex:function(id){
    		var obj=document.getElementsByClassName('radio-sm-wrap');
    		for(var i=0;i<obj.length;i++){
    			obj[i].setAttribute('class','radio-sm-wrap radio-noactive');
    		}
    		document.getElementById(id).setAttribute('class','radio-sm-wrap radio-active');
    		this.sex=id.replace(/data-/g,'');
    	},
        toCreatSuccess(){
            if(this.userName.length > 0 && this.userPhone.length>0){
                var formData= new FormData();
                formData.append('userName',this.userName)   
                formData.append('userPhone',this.userPhone)   
                formData.append('sex',this.sex)   
                formData.append('examTime',this.$parent.examTime)   
                formData.append('preExamDay',this.$parent.preExamDay)
                this.$http.post('http://192.168.1.132:8080/json/post_regUser.php',formData).then((response)=>{
                    alert('请求成功');
                    this.$router.push({path:'/CreatSuccess'})  
                },(error)=>{
                    alert('请求出错');
                    this.$router.push({path:'/CreatSuccess'}) 
                })   
            }
        }

    }
}
</script>
<style lang="less" scoped>
@import '../assets/css/variables.less';
.radio-sm-wrap{
    box-sizing: border-box;
    padding: 4px
}

.radio-sm {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center
}
.radio-noactive div {
    background: @gray-lighter;
    color: @black;
    border: 1px solid #ddd
}

.radio-active {
    border: 1px solid @green; 
    div {
        background: @green;
        color: @white
    }
}

ul {
    li {
        margin-right: 10px;
        float:left;
    }
    li:last-child {
        margin-right: 0
    }
}
.inputs{
	box-sizing:border-box;
	border:1px solid @gray-lighter;
	width:100%;
	height:34px;
	text-indent:7px;
	color:@gray;
	&:focus{
		border-color:@green
	}
}
</style>
