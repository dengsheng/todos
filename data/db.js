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
			status:String
	});
let todoModel = mongoose.model('todoModel',toDoScheme);
/*打开一次数据库*/
Todos.prototype.operate = function(fn){
	db.once('open',fn);
};

/*保存*/
Todos.prototype.save = function(){

	this.operate(function(){
		let newtodo = new todoModel({name:this.name,status:this.status});
		newtodo.save();
	});

};
/*删除*/
Todos.prototype.delete = function(){

};
/*删除全部*/
Todos.prototype.deleteAll = function(){

};
/*获取*/
Todos.prototype.getAll = function(){
	console.log(todoModel.find({},function(err,data){
		if(err){
			console.log(err)
		}
	}));
};

module.exports = Todos;

