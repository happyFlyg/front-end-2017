var http=require("http");
var fs=require("fs");
var url=require("url");

FILE='d:/node/GET';
var server=http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/html'}); //mime
    urlText=FILE+url.parse(request.url).pathname;
    console.log(urlText);
    if (url.parse(request.url).pathname!='/favicon.ico'){
        var data=fs.readFileSync(urlText,'utf-8');
        response.write(data);
    }
    response.end();
});
server.listen(8080,"192.168.1.10");
console.log('server running at http://192.168.1.10:8080')
server.on("connection",function(){
    console.log('loading...');
});