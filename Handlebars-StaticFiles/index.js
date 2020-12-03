var express = require('express');
const { dirname } = require('path');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.htm");    
});

app.get('/index.htm', function(req, res){
    res.sendFile(__dirname + "/public//index.htm");    
});

app.listen(8080, function(){
    console.log("Server listening on port 8080");
});