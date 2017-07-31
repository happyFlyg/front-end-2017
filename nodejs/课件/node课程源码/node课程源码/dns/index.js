//1 resolve() --决定 域名转换成ip（dns的记录）
//2 reverse() --颠倒 ip转换成域名 lookup()

var dns = require('dns');

//dns.resolve('www.dushu.help','A',function(err,res){
//    if(err){
//        throw err;
//    };
//    console.log(res);
//});
dns.lookup('www.baidu.com','4',function(err,res){
    if(err){
        throw err;
    };
    console.log(res);
});

dns.reverse('220.181.112.244',function(res){
    console.log(res);
});