import axios from "axios";
import {API_URL} from '../../Constants';

class TodoService{
    username = 'sebastian';
    password = 'dummy';
    basicAuthHeader = 'Basic ' + window.btoa(this.username + ":" + this.password); 

    retrieveAllTodos(name){
        return axios.get(`${API_URL}/users/${name}/todos`);
    }

    retrieveTodoById(name,id){
        return axios.get(`${API_URL}/users/${name}/todos/${id}`);
    }

    deleteTodo(name, id){
        return axios.delete(`${API_URL}/users/${name}/todos/${id}`);
    }

    updateTodo(name, id, todo ){
        return axios.put(`${API_URL}/users/${name}/todos/${id}`, todo);
    }

    createTodo(name, todo){
        return axios.post(`${API_URL}/users/${name}/todos/`, todo);
    }

}

export default new TodoService();