var crypto=require('crypto');
var md5=crypto.createHash('md5');
var passwrod='wos';
md5.update(passwrod);
var d=md5.digest('md5');
console.log(d);
