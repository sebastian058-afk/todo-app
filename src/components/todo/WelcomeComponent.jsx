import { Component } from "react";
import { Link } from 'react-router-dom';
import HelloWorldService from "../../api/todo/HelloWorldService.js";

class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccesfulResponse = this.handleSuccesfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
        this.state = {
            welcomeMessage : ''
        }
    }
    render(){
        return(
            <>
                <h1>
                    Welcome... back!
                </h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. You can manage your Todos <Link to="/todos">here</Link>
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get welcome message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }

    retrieveWelcomeMessage(){
        /* HelloWorldService.executeHelloWorldService().then(response =>             
            this.handleSuccesfulResponse(response)            
        ) */

        /* HelloWorldService.executeHelloWorldBeanService().then(response =>             
            this.handleSuccesfulResponse(response)            
        ) */

        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name).then(response =>
            this.handleSuccesfulResponse(response)
        ).catch(error => this.handleError(error));
    }

    handleSuccesfulResponse(response){
        console.log(response)
        this.setState({welcomeMessage: response.data.message});        
    }

    handleError(error){
        console.log(error.response)
        this.setState({welcomeMessage: error.response.data.message});
    }
}

export default WelcomeComponent;