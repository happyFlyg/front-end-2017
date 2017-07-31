var https = require ('https');
var fs = require('fs');
var options ={
    hostname : '192.168.19.129',
    port : 8000,
    path : '/1.html',
    method : 'GET',
    key : fs.readFileSync('client.key'),
    cert : fs.readFileSync('client.crt'),
    ca : [fs.readFileSync(ca.crt)]
};
options.agent = new https.Agent(options);

var req=https.request(options,function(res){
    res.setEncoding('utf-8');
    res.on('data',function(d){
       console.log(d);
    });
});

req.end();
req.on('error',function(e){
    console.log(e);
});