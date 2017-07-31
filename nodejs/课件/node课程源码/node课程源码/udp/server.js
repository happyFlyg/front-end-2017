var dgram = require("dgram");
var server = dgram.createSocket('udp4');
server.on('error',function(err){
    console.log('error:'+err.stack);
    server.close();
});
server.on("message",function(msg,rinfo){
    console.log(rinfo.address + ' : '+ rinfo.port + ' ' + msg);
});
server.on("listening",function(){
    var address=server.address();
    console.log(address.address +":"+ address.port);
});
server.bind('8888')