'use strict'

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos');
const db = mongoose.connection;

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
Todos.prototype.save = function(){
	var Name = this.name;
	var Status = this.status;
	db.once('open',function(){
		let newtodo = new todoModel({name:Name,status:Status});
		newtodo.save(function(err){
			if(err){
				console.error(err);
			}
		});
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
		callback(docs);
	});
};

module.exports = Todos;

