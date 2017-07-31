var tls = require ('tls');
var fs= require('fs');
var options={
    key:fs.readFileSync('./key/server.key'),
    cert:fs.readFileSync('./key/server.crt'),
    requestCert:true,
    ca:[fs.readFileSync('./key/ca.crt')]
};
var server =tls.createServer(options,function(stream){
    stream.write("welcome\n");
    stream.setencoding('utf-8');
    stream.pipe(stream)
});
server.listen(8000,function(){
    console.log('server bound');
});