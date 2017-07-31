var http=require('http');
var options = {
                hostname : '192.168.1.10',
                port : 8080,
                path : '/1.html',
                method : 'GET'
            };
//request=进贡 response=打赏
var req = http.request(options,function(res){
        console.log('statusCode:' + res.statusCode);
        console.log(res.headers);
        console.log('headers:' + JSON.stringify(res.headers));
        res.on('data',function(chunk){
            console.log('BODY:' + chunk);
        })
    });
req.on('error',function(e){
    console.log('error: '+ e.message);
});
req.end();


//---1
var http=require("http");
http.createServer(function( request,response){
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.end('Hello World\n');
}).listen(8080,'192.168.1.10');
console.log('Server running at http://192.168.1.10:8080/');

//---2 http输出html
var http=require("http");
http.createServer(function( request,response){
    response.writeHead(200,{'Content-Type' : 'text/html'});
    response.write("<html><body style=\"text-align: center; background-color: #ff6600;\"><h1 style=\'color:#fff\'>Hello Node.js</h1></body></html>");
    response.end();
}).listen(8080,'192.168.1.10');
console.log('Server running at http://192.168.1.10:8080/');

//调取文件并输出
var http=require("http");
var fs = require('fs');
http.createServer(function( request,response){
    response.writeHead(200,{'Content-Type' : 'text/html'});
    var data = fs.readFileSync('1.html', 'utf8');
    response.write(data);
    response.end();
}).listen(8080,'192.168.1.10');
console.log('Server running at http://192.168.1.10:8080/');

//meta
var mimetype = {
    'txt': 'text/plain',
    'html': 'text/html',
    'css': 'text/css',
    'xml': 'application/xml',
    'json': 'application/json',
    'js': 'application/javascript',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'png': 'image/png',
    'svg': 'image/svg+xml'
}

//---3 url分析
var http = require('http');
var url = require('url');
var util = require('util');
var server = http.createServer(function(request,response){
    response.writeHead(200 , {"Content-Type":"text/html"});
    response.write("YOU require : " + util.inspect(url.parse(request.url)));  //重点在这里
    response.write('\n\r');
    response.write(url.parse(request.url).pathname);
    response.end;
});
server.listen(8888);
console.log("Your server is started @port 8888");

//--4 URL解析
var fs = require('fs');  //引入模块
var http=require("http");
var url = require('url');
http.createServer(function( request,response){
    response.writeHead(200,{'Content-Type' : 'text/html'});

    var urltext=url.parse(request.url).pathname;
    if (urltext.substr(0,1)=='/') urltext=urltext.substr(1); //去除/
    console.log(urltext);
    if(urltext!="favicon.ico"){
        var data = fs.readFileSync(urltext, 'utf8');
        response.write(data);
        response.end();
    }
}).listen(8080,'192.168.1.10');
console.log('Server running at http://192.168.1.10:8080/');


//js获取get

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
alert(GetQueryString("a"));

// --5 node获取get值
var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');

var server = http.createServer(function(request,response){
    response.writeHead(200 , {"Content-Type":"text/html"});
    response.write("YOU require : " + util.inspect(url.parse(request.url)));  //重点在这里
    response.write('\n\r');
    response.write(url.parse(request.url).pathname);

    queryStr=url.parse(request.url).query;
    var aStr = querystring.parse(queryStr).a;
    response.write('a Value:'+aStr);

    response.end;
});
server.listen(8888);
console.log("Your server is started @port 8888");

