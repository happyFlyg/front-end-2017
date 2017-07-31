<?php
include ("./config.php");
$code = $_GET['code'];
$state = $_GET['state'];


if (empty($_GET['code'])){
	//授权失败
	echo '<a href="index.php?to='.$state.'">授权失败，点击这里重新授权</a>';
	exit;
} 

//拉取登录信息
$access_token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$appsecret.'&code='.$code.'&grant_type=authorization_code';
$access_token = json_decode(curl_file_get_contents($access_token_url));

if (isset($access_token->errcode)){
  //拉取登录信息失败
  echo '<a href="index.php?to='.$state.'">获取登录信息失败，点击这里重新授权</a>';
  exit;
} 

//拉取用户信息
$user_info_url ='https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token->access_token.'&openid='.$access_token->scope.'&lang=zh_CN ';
$user_info = json_decode(curl_file_get_contents($user_info_url));
if (isset($user_info->errcode)){
  //拉取登录信息失败
  echo '<a href="index.php?to='.$state.'">获取用户信息失败，点击这里重新授权</a>';
  exit;
} 

$time = time()+3600*24*7; //默认cookies保存时间为7天
$route = '/';

setcookie(openid, $user_info->openid, $time, $route , $domain);
setcookie(nickname, $user_info->nickname, $time, $route , $domain);
setcookie(sex, $user_info->sex, $time, $route , $domain);
setcookie(province, $user_info->province, $time, $route , $domain);
setcookie(city, $user_info->city, $time, $route , $domain);
setcookie(country, $user_info->country, $time, $route , $domain);
setcookie(headimgurl, $user_info->headimgurl, $time, $route , $domain);

header('location:'.$loginUrl.'?to='.$state);


//远程信息获取函数
function curl_file_get_contents($durl){
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $durl);
  curl_setopt($ch, CURLOPT_TIMEOUT, 5);
  curl_setopt($ch, CURLOPT_USERAGENT, _USERAGENT_);
  curl_setopt($ch, CURLOPT_REFERER,_REFERER_);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  $r = curl_exec($ch);
  curl_close($ch);
   return $r;
}

?>