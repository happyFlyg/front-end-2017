var dgram = require("dgram");
var message=new Buffer('Hi,我是wos');
var client=dgram.createSocket('udp4');
client.send(message,0,message.length,8888,'192.168.1.10',function(err,bytes){
    client.close();
});