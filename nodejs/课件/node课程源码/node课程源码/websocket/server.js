var io=require('socket.io');

var socket=io.listen('8080');
socket.on('connection',function(client){
    client.emit('news','{hello:world4}');
    client.send('welcome');
    client.on('my',function(data){
        console.log(data);
    })
});
