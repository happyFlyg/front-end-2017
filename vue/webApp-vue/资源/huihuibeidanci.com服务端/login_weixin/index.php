<?php
include ("./config.php");
$to = $_GET['to'];
if ($to == "cet4"){
	if (empty($_COOKIE["openid"])){
		$redirect_uri=$loginUrl.'weixin.php';
		header('location:https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri='.$redirect_uri.'&response_type=code&scope=snsapi_userinfo&state='.$to.'#wechat_redirect');
	}else{
		header('location:http://cet4.huihuibeidanci.com/login_weixin.php');
	}
}
?>