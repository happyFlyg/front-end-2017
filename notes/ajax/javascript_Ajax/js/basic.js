/**
 * XMLHttpRequest 对象兼容
 * http://www.jikexueyuan.com/course/2038_3.html?ss=2
 */
// IE7+和其他浏览器都支持
// XMLHttpRequest 有level1和level2两个版本
// 现代浏览器支持 xhr level2 版本
// xhr level2兼容xhr1并新增
// 1.timeout支持
// 2.CORS 跨域支持
// 3.upload 文件上传支持
function createXHR(){
	return new XMLHttpRequest();
} 
// 创建对象，兼容版
// IE6+ Msxml2. XMLHTTP
// 小于IE6 Microsoft.XMLHTTP
function creatXHR2(){
	var xhr=null;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else if(window.ActiveXObject){
		try{
		     xhr=new ActiveXObject('Msxml2.XMLHTTP');
		} catch(e){
			try {
				xhr = new ActiveXObject('Microsoft.XMLHTTP');
			}catch(e){}
		}
	}
	return xhr;
}