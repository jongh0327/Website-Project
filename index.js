var express = require('express');
var ip = require("ip")
var app = express();

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.get('/paint', function(req,res){
  res.render('paint/index',{});
});

app.get('/naming', function(req,res){
  res.render('naming/index',{ip:ip.address()});
});

app.get('/bingo', function(req,res){
  res.render('bingo/index',{});
});

app.get('/hello', function(req,res){
  res.render('hello', {name:req.query.nameQuery});
});

app.get('/hello/:nameParam', function(req,res){
  res.render('hello', {name:req.params.nameParam});
});

var port = 80;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
