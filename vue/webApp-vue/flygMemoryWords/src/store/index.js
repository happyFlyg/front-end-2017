import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	serverIP:'http://localhost:90',
    newbi:'1',
    leftmenuShow:true,
    openId:'000021',
    headimgurl:'http://www.bjgjj.gov.cn/images2016/x_y4.jpg',
    name:'flygLiao_develop',
    nickname:'liao flyg',
    sex:'1',
    examTime:'2018-6-17',
    oneday:'20',
    province:'河南',
    city:'洛阳',
    country:'中国',
    regdate:'2016-6-17 09:30:20',
    xp:'43',
    memory:'56',
    notice:'123',
    percent:'30'
}
const getters={
    stime:function(){
        var mydate= new Date();
        return mydate.getTime();
    }
}
const mutiations={

}
export default new Vuex.Store({
	state,
    getters,
    mutiations
});
/*var state, xmlhttp;
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		state = eval(xmlhttp.responseState);
	} else {
		state = {
			serverIP: '0'
		}
	}
}
//需要解决apach跨域请求问题
// xmlhttp.open('GET','http://192.168.1.161/json/users.php',false);
xmlhttp.open('POST','http://192.168.1.132:8080/json/users.php',false);
xmlhttp.xhr.setRequestHeader('X-Custom-Header', 'value');
xmlhttp.send();
export default new Vuex.Store({
	state,
    getters,
    mutiations
});

*/
