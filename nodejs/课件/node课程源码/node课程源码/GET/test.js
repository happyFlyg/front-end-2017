var http=require("http");
var url=require("url");
var util=require('util');

var server=http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/plain'});

    response.write(util.inspect(url.parse(request.url)));
    response.write('\n\r');
    response.write (url.parse(request.url).pathname);
    response.end()
});
server.listen(8888);
console.log("URL check");