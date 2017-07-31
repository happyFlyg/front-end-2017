var str='wos的课堂';
console.log(str);
var buf=new Buffer(str,'utf-8');
console.log(buf);
var str2=buf.toString();
console.log(str2);