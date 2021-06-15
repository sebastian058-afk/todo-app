import { Component } from "react";
import AuthenticationService from './AuthenticationService.js';

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
        /* AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        .then(() => {
            AuthenticationService.registerSuccesfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
        }).catch(() =>{
            this.setState({
                loginHasFailed: true,
                showSuccessMessage: false
            })
        }); */
        
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
        .then((response) => {
            AuthenticationService.registerSuccesfulLoginJwt(this.state.username, response.data.token)
            this.props.history.push(`/welcome/${this.state.username}`)
        }).catch(() =>{
            this.setState({
                loginHasFailed: true,
                showSuccessMessage: false
            })
        });
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

export default LoginComponent;