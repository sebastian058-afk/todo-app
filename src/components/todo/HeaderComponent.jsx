import { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import AuthenticationService from './AuthenticationService.js';
import './Todo.css';

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

export default withRouter(HeaderComponent);