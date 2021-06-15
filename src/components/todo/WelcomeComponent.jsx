import { Component } from "react";
import { Link } from 'react-router-dom';

class WelcomeComponent extends Component{
    constructor(props){
        super(props)        
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
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }
}

export default WelcomeComponent;