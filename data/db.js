'use strict'

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos');
var db = mongoose.connection;

function Todos(name,status){
	this.name = name;
	this.status = status;
}

let toDoScheme = mongoose.Schema({
			name:String,
			status:{type:String,default:'todo'}
	});
let todoModel = mongoose.model('todoModel',toDoScheme);
/*打开一次数据库*/
Todos.prototype.operate = function(fn){
	db.once('open',fn);
};

/*保存*/
Todos.prototype.savetodo = function(){
	var Name = this.name;
	var Status = this.status;
	console.log(Name);
	console.log(Status);
	//console.log(db);
	let newtodo = new todoModel({name:Name,status:Status});
	newtodo.save(function(err){
			if(err){
				console.error(err);
			}else{
				console.log("插入成功");
			}
	});
};
/*删除*/
Todos.prototype.delete = function(){

};
/*删除全部*/
Todos.prototype.deleteAll = function(){

};
/*获取*/
Todos.prototype.getAll = function(callback){
	 todoModel.find({},function(err,docs){
		if(err){
			console.error(err);
		}
		docs.map(function(item){
			return item.toObject();
		});
		callback(docs);//返回获取到的数据
	});
};

module.exports = Todos;

