var net = require ('net');  // net 模块被我们引入
var ChatServer = net.createServer(); //net.createSever()方法
clinetList=[];
ChatServer.on("connection",function(client){
    client.name = client.remoteAddress + ':' + client.remotePort; //建立了client.name属性

    console.log(client.name + ' joined \n\r'); //谁来了
    clinetList.push(client);
    client.write('Welcome to Wos chat server...\n\r');
    //client.write('This server building...... \n\r'); //client.write 向客户端输出内容
    //client.end(); //end()关闭客户端连接
    client.on("data",function(data){
        //console.log(data.toString());
        for (var i = 0 ; i < clinetList.length ; i++){
            if (client != clinetList[i]){
                clinetList[i].write(client.name + ':'+ data.toString());
            }
        }
    });
    client.on('end',function(){
        clinetList.splice(clinetList.indexof(clinet),1);
    });
    client.on('error',function(e){
        console.log(e);
    });
});
ChatServer.listen(9000);
