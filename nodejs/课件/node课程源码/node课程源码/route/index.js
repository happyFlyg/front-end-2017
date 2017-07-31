var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/ab?cd', function(req, res) {
    res.send('ab?cd');
});
app.listen(8888);