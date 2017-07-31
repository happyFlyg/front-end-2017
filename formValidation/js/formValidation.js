function getLength(str){
   return str.replace(/[^\x00-\xff]/g,'xx').length;
}
//排除相同字符
function findStr(str,n){
   var tmp=0;
   for(i=0;i<str.length;i++){
   	if(str.charAt(i)==n){
   	   tmp++
   }
   }
   return tmp;
}
window.onload=function(){
	var aInput=document.getElementsByTagName('input');
	var oName=aInput[0];
	var pwd=aInput[1];
	var pwd2=aInput[2];
	var aP=document.getElementsByTagName('p');
	var name_msg=aP[0];
	var pwd_msg=aP[1];
	var pwd2_msg=aP[2];
	var count=document.getElementById('count');
	var aEm=document.getElementsByTagName('em');	
    var re=/[^\w\u4e00-\u9fa5]/g;
    var name_length=0;
    //用户名
     oName.onfocus=function(){
      name_msg.style.display='inline-block';
    }
    oName.onkeyup=function(){
      count.style.visibility='visible';
      name_length=getLength(this.value);
      count.innerHTML=name_length+"个字符";
      if(name_length==0){
      	 count.style.visibility='hidden';
      }
    }
    oName.onblur=function(){
        //含有非法字符
        var re=/[^\w\u4e00-\u9fa5]/g;
        if(re.test(this.value)){
          name_msg.innerHTML="<span class='err'>含有非法字符！</span>";
        }
        //不能为空
        else if(this.value==''){
          name_msg.innerHTML="<span class='err'>不能为空！</span>";
        }
        //长度超过25个字符
        else if(name_length>25){
          name_msg.innerHTML="<span class='err'>不能大于25个字符！</span>";
        }
        //长度少于6个字符
        else if(name_length<6){
         name_msg.innerHTML="<span class='err'>不能小于6个字符！</span>";
        }
        //ok
        else{
        	name_msg.innerHTML="ok";
        }
    }
    //密码
    pwd.onfocus=function(){
        pwd_msg.style.display='inline-block';
    }
    pwd.onkeyup=function(){
    	//密码大于5个数
        if(this.value.length>5){
        	aEm[1].className='active';
        	pwd2.removeAttribute("disabled");
        	pwd2_msg.style.display='inline-block';
        }
        else{
        	aEm[1].className='';
        	pwd2.setAttribute("disabled",'');
        	pwd2_msg.style.display='none';
        }
        	//密码大于10个数
        if(this.value.length>10){
        	aEm[2].className='active';
        	
        }
        else{
        	aEm[2].className='';
        	
        }
    }
    pwd.onblur=function(){
        //不能为空
        var m=findStr(pwd.value,pwd.value[0]);
        var re_n=/[^\d]/g;
        var re_t=/[^a-zA-Z]/g;
        if(this.value==''){
        	pwd_msg.innerHTML='不能为空！';
        }
        //不能用相同字符
        else if(m==this.value.length){
           pwd_msg.innerHTML='不能用相同字符！';
        }
        //长度应在6-16个字符
        else if(this.value.length<6||this.value.length>16){
           pwd_msg.innerHTML='6-16个字符！';
           pwd2.setAttribute("disabled",'');
        }
        //不能全为数字
        else if(!re_n.test(this.value)){
           pwd_msg.innerHTML='不能全为数字！';
            pwd2.setAttribute("disabled",'');
        }
        //不能全为字母
        else if(!re_t.test(this.value)){
           pwd_msg.innerHTML='不能全为字母';
           pwd2.setAttribute("disabled",'');
        }
        //ok
        else{
           pwd_msg.innerHTML='ok';

        }
    }
     //确认密码
    pwd2.onblur=function(){
       if(this.value!=pwd.value){
         pwd2_msg.innerHTML='两次输入的密码不一致！';
       }else{
         pwd2_msg.innerHTML='ok';
         
       }
    }
}