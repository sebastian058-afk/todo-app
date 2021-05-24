import { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js';
import './Todo.css';

class TodoApp extends Component{
    render(){
        return(
            <div className="TodoApp">
            <Router>
                <>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <Route path="/welcome/:name" component={WelcomeComponent}/>
                        <Route path="/todos" component={ListTodosComponent}/>
                        <Route path="/logout" component={LogoutComponent}/>
                        <Route component={RouteErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </>
            </Router>
            </div>
        );
    }
}

class HeaderComponent extends Component{
    render(){
        const isUserLogged = AuthenticationService.isUserLoggedIn();
        console.log(isUserLogged)
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://www.google.com" className="navbar-brand">in28minutes</a></div>
                    <ul className="navbar-nav">
                        {isUserLogged ? <li className="navbar-link"><Link to="/welcome/:name">Home</Link></li> : <></>}
                        {isUserLogged ? <li className="navbar-link"><Link to="/todos">Todos</Link></li> : <></>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLogged ? <li className="navbar-link"><Link to="/login">Login</Link></li> : <></> }
                        {isUserLogged ? <li className="navbar-link"><Link to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li> : <></>}
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component{
    render(){
        return(
            <footer className="footer">
                <span className="text-muted">All rights reserved 2021 @BNH</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component{
    render(){
        return(
            <div>
                <h1>You logged out</h1>
                <div className="container">Thank you for using our application</div>
            </div>
        )
    }
}

class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos:[
                {id: 1, description: 'Learn to dance', done: false, targetDate: new Date()},
                {id: 2, description: 'Become an expert at React', done: false, targetDate: new Date()},
                {id: 3, description: 'Visit Mexico', done: false, targetDate: new Date()},
            ] 
        }
    }
    render(){
        return(
            <div className="">
                <h1>List Todos</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is completed</th>
                                <th>Target Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                    <tr>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
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


class WelcomeComponent extends Component{
    render(){
        return(
            <>
                <h1>
                    Welcome!
                </h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. You can manage your Todos <Link to="/todos">here</Link>
                </div>
            </>
        )
    }
}

function RouteErrorComponent(){
    return(
        <div className="">This route doesn't exist</div>
    )
}

class  LoginComponent extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: 'sebastian',
            password: '',
            loginHasFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked(){
        console.log(this.state)
        if(this.state.username === 'sebastian' && this.state.password === 'dummy'){
            AuthenticationService.registerSuccesfulLogin(this.state.username, this.state.password);
            console.log("Successful")
            this.props.history.push(`/welcome/${this.state.username}`);
        }else{
            console.log("Failed")
            this.setState({
                loginHasFailed: true,
                showSuccessMessage: false
            })
        }
    }

    render(){
        return(
            <div>
                <h1>Log In</h1>
                <div className="container">
                    {this.state.loginHasFailed && <div className="alert alert-warning">Invalid credentials</div>}
                    {this.state.showSuccessMessage && <div>LogIn Succesful</div>}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    <button className="btn btn-success" type="submit" onClick={this.loginClicked}>LogIn</button>
                </div>
            </div>
        )
    }
}

export default TodoApp;