var app = app || {};


(function(){
	let TodoApp = React.createClass({
		getInitialState:function(){
			return {data:[]};
		},
		loadTodosFromServer:function(){
			$.ajax({
				url:this.props.url,
				type:"GET",
				dataType:"json",
				cache:false,
				success:function(data){
					this.setState({data:data});
				}.bind(this),
				error:function(xhr,status,err){
				   console.error(this.props.url,status,err.toString());
				}.bind(this)
			});
		},
		componentWillMount:function(){
			console.log("todo component will mount");
		},
		componentDidMount:function(){
			this.loadTodosFromServer();
			setInterval(this.loadTodosFromServer,this.props.pollInterval);
		},
		componentWillUpdate:function(){
			//console.log("todo will update");
		},
		componentDidUpdate:function(){
			this.loadTodosFromServer();
			//console.log("todo did update");
		},
		todoSubmit:function(todo){
			$.ajax({
				url:this.props.url,
				type:"post",
				data:todo,
				dataType:"json",
				success:function(newdata){
					this.setState({data:newdata});
					console.log(this.state.data);
				}.bind(this),
				error:function(xhr,status,err){
					console.error(this.props.url,status,err.toString());
				}.bind(this)
			});
			console.log(todo);
		},
		render:function(){
			return (
				<div>
					<h1>todos</h1>
					<TodoForm onTodoSubmit={this.todoSubmit} />
					<TodoItemList data={this.state.data} />
					<TodoFooter />
				</div>
					);
				}
			});
	let TodoForm = React.createClass({
			getInitialState:function(){
				return {name:'',status:'undo'};
			},
			handleNameChange:function(e){
				this.setState({name:e.target.value});
			},
			handleSubmit:function(e){
				e.preventDefault(); //阻止表单提交
				var name = this.state.name.trim();
				var status = this.state.status.trim();
				this.props.onTodoSubmit({name:name,status:status});
				this.setState({name:'',status:'undo'});
			},
			render:function(){
				return (
					 <form className="todoForm" onSubmit={this.handleSubmit}>
						<input type="text" placeholder="What needs to be done" value={this.state.name} onChange={this.handleNameChange}/>
					</form>	
				);
			}
	});
	let TodoItemList = React.createClass({
			       
			render:function(){
				var todosNodes = this.props.data.map(function(todos){
					return (
							<TodoItem key={todos._id} name={todos.name}>

							</TodoItem>
						);
				});
				return (
						<div className="todoList">
							{todosNodes}
						</div>
					);
			}
	});
	let TodoItem = React.createClass({
			render:function(){
				return (
					<div className="item">
						<input type="radio" />
						<span><b>{this.props.name}</b></span>
						<span className="finish" onclick={this.props.deleteTodo}>×</span>
					</div>
				);
			}
	});
	let TodoFooter = React.createClass({
			render:function(){
				return(
					<div className="TodoFooter">
						<div className="left">
							<span>0</span>items left
						</div>
						<div className="status">
							<button>All</button>
							<button>Active</button>
							<button>Completed</button>
						</div>
					</div>
				);
			}
	});
	ReactDOM.render(<TodoApp url = 'getdata' pollInterval={2000}/>,
		document.getElementById('todoApp'));
})();