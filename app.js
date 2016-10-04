'use strict'
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/db.js');
const dbex = new db();
const app = express();

app.set('port',(process.env.PORT || 3000));
app.set('view engine','jade');
app.set('views',__dirname+'/public');

app.use(express.static(path.join(__dirname,'./public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res,err){
		
		dbex.getAll(function(post){
			res.render('index',{
				data:post
			});
		});
});

app.get('/getdata',function(req,res,err){
	dbex.getAll(function(data){
		res.json(data);
	});
});

app.post('/getdata',function(req,res){
	var name = req.body.name;
	var status = req.body.status;
	var dbsave = new db(name,status);
	dbsave.savetodo();
	dbex.getAll(function(data){
		res.json(data);
	});
});


/*
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin',"*");
	res.setHeader('Cache-Control','no-cache');
	next();
});*/

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

