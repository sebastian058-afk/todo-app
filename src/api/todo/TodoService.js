import axios from "axios";

class TodoService{
    username = 'sebastian';
    password = 'dummy';
    basicAuthHeader = 'Basic ' + window.btoa(this.username + ":" + this.password); 

    retrieveAllTodos(name){
        return axios.get(`http://localhost:8080/users/${name}/todos`);
    }

    retrieveTodoById(name,id){
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`);
    }

    deleteTodo(name, id){
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
    }

    updateTodo(name, id, todo ){
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo);
    }

    createTodo(name, todo){
        return axios.post(`http://localhost:8080/users/${name}/todos/`, todo);
    }

}

export default new TodoService();