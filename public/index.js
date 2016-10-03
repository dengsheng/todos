var app = app || {};


(function(){
	let TodoApp = React.createClass({
		render:function(){
			return (
						<div>
							<h1>todos</h1>
							<form>
								<input type="text" placeholder="What needs to be done" />
							</form>

						</div>
					);
				}
			});
			let TodoItem = React.createClass({
			       
					render:function(){
						
					}
			});
			let TodoFooter = React.createClass({
					render:function(){

					}
			});
			ReactDOM.render(<TodoApp url = {""}/>,
				document.getElementById('todoApp'));
		})();