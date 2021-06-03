import moment from "moment";
import { Component } from "react";
import TodoService from "../../api/todo/TodoService";
import AuthenticationService from './AuthenticationService';

class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos:[] ,
            message: null,
            deleteFailed: false
        }

        this.deleteTodo = this.deleteTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
    }

    componentDidMount(){
        this.refreshTodos();
    }

    refreshTodos(){
        TodoService.retrieveAllTodos(AuthenticationService.getUserLoggedIn()).then(
            response => {
                console.log(response.data);
                this.setState({todos:response.data});
            }
        )
    }

    deleteTodo(id, description){
        let user = AuthenticationService.getUserLoggedIn()
        console.log(user)
        TodoService.deleteTodo(user, id).then(
            response => {                
                this.setState({message: `Todo '${description}' deleted succesfully`,
                                deleteFailed: false});
                this.refreshTodos();
                setTimeout(() => {
                    this.setState({message: null});
                }, 3500);
            }
        ).catch(
            error =>{
                this.setState({message: `Could not delete Todo '${description}'`,
                                deleteFailed: true});
                setTimeout(() => {
                    this.setState({message: null});
                }, 3500);
                console.log(error);
            }
        )
    }

    updateTodo(id){
        this.props.history.push(`/todos/${id}`);
    }

    addTodoClicked(){ 
        this.props.history.push(`/todos/-1`);
    }

    render(){
        return(
            <div className="container">
                <h1>List Todos</h1>
                <div className="btn-add-todo">
                    <button className="btn btn-warning" onClick={this.addTodoClicked}>Add todo<i className="bi bi-plus-square-fill"></i></button>
                </div>
                {this.state.message != null && this.state.deleteFailed === false && <div className="alert alert-success">{this.state.message}</div>}
                {this.state.message != null && this.state.deleteFailed === true && <div className="alert alert-danger">{this.state.message}</div>}
                <div className="container">                    
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is completed</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-outline-info" onClick={() => this.updateTodo(todo.id)}>Update<i className="bi bi-pencil-fill"></i></button></td>
                                        <td><button className="btn btn-outline-danger" onClick={() => this.deleteTodo(todo.id, todo.description)}>Delete<i className="bi bi-trash-fill"></i></button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>                    
                </div>
            </div>
        )
    }
}

export default ListTodosComponent;