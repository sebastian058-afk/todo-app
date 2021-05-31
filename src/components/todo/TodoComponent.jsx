import moment from "moment";
import { Component } from "react";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import TodoService from "../../api/todo/TodoService";
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.getTodoInfo = this.getTodoInfo.bind(this);
    }

    componentDidMount(){
        this.getTodoInfo();
    }

    getTodoInfo(){
        let username = AuthenticationService.getUserLoggedIn();
        TodoService.retrieveTodoById(username, this.state.id).then(
            response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            })
        ).catch(
            error => console.log(error)
        );
    }

    onSubmit(values){
        console.log(values);
    }

    validate(values){
        let errors = {};
        if(!values.description){
            errors.description = 'Enter a description';
        }else{
            if(values.description.length < 5){
                errors.description = 'Enter a description at least 5 characters long';
            }else{
                if(values.description.length > 100){
                    errors.description = 'The description cannot be more than 100';
                }
            }
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter a valid target date';
        }

        return errors;
    }

    render(){

        let {description, targetDate} = this.state;
        /* let description = this.state.description;
        let targetDate = this.state.targetDate; */
        return(
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{description, targetDate}}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) =>(
                                <Form>                                                                        
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                        <ErrorMessage name="description" component="div" 
                                    className="alert alert-warning"></ErrorMessage>
                                    </fieldset>                                    
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                        <ErrorMessage name="target-date" component="div" 
                                    className="alert alert-warning"></ErrorMessage>
                                    </fieldset>
                                    <button className="btn btn-lg btn-success" type="submit">Save</button>
                                </Form>                                
                            )
                        }
                    </Formik>
                </div>
            </div>
        )        
    }
}

export default TodoComponent;