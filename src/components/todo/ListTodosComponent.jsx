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
        let user = AuthenticationService.getUserLoggedIn;
        TodoService.deleteTodo(user, id).then(
            response => {                
                this.setState({message: `Todo '${description}' deleted succesfully`,
                                deleteFailer: false});
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

    render(){
        return(
            <div className="">
                <h1>List Todos</h1>
                {this.state.message != null && this.state.deleteFailed === false && <div className="alert alert-success">{this.state.message}</div>}
                {this.state.message != null && this.state.deleteFailed === true && <div className="alert alert-danger">{this.state.message}</div>}
                <div className="container">                    
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is completed</th>
                                <th>Target Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-info" onClick={() => this.updateTodo(todo.id)}>Edit</button></td>
                                        <td><button className="btn btn-danger" onClick={() => this.deleteTodo(todo.id, todo.description)}>Delete</button></td>
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