var net = require('net'); //net 模块被引用
var chatSever = net.createServer(); //建立服务器
var clientList = [];
/*chatSever.on("connection",function(client){//属性用双引号
   client.write('liaoli node\n\r');//write向客户端输出内容
   client.write('This server building...\n\r');//加上\r为了适合windows服务器
   client.end();//end()关闭客户端连接
});*/
chatSever.on("connection", function(client) {
	client.name = client.remoteAddress + ':' + client.remotePort;
	console.log(client.name + 'joied\n\r'); //谁来了
	clientList.push(client);
	client.on("data", function(data) { //客户端监听
		// console.log(data.toString());
		for (var i = 0; i < clientList.length; i++) {
			if (client != clientList[i]) { //如果不是我的client，向对方输出聊天内容
				// clientList[i].write(data);
				clientList[i].write(client.name + ':' + data.toString());
			}
		}
	});
	client.on("end", function() { //离开
		clientList.splice(clientList.indexof(client), 1); //删除
	});
	client.on("error", function(e) { //出错
		console.log(e); //打印出错
	});

});
chatSever.listen(9000); //监听端口
/**
 * 1.进入本目录 在终端输入 node chat.js
 * 2.无需进入本目录  终端输入telnet localhost 9000
 */
/**
 * net模块总结：
 * 1.基于http没多大用处，APP或者即时通信或者客户端在电脑上 服务端在服务器上很有用
 * 2.创建一个tcp服务器
 * 3.100万人同时聊天。一台服务器 八核的就够了，随时释放内存，非常快捷 方便
 */