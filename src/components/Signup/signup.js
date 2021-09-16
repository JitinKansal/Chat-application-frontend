import React,{Component} from 'react';
import './signup.css';
import 'axios';
import axios from 'axios';
import Signin from '../Signin/signin';

class signup extends Component{
    constructor(props){
        super(props);
        this.state ={
            username:"",
            password:"",
            Repassword:"",
            email:"",
            errormessage:"",
            signup:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        let err = "";
        if(!this.state.username){
                err = <strong>Please provide the user name.</strong>;
        }   
        else if(!this.state.email){
                err = <strong>Please provide the email.</strong>;
        }
        else if(!this.state.password){
                err = <strong>Please provide the password.</strong>;
        }
        else if(!this.state.Repassword){
            err = <strong>Please provide the Repassword.</strong>;
        }
        else if(this.state.password !== this.state.Repassword){
            err = <strong>Please enter the same password in Repassword.</strong>;
        }
        else{
            const user = {
                username:this.state.username,
                email:this.state.email,
                password:this.state.password,
            };
            axios.post('user/register',user).then(
                res => {
                    if(res.data.message.message){
                        console.log(res.data.message.message);
                    }
                    else{
                    console.log(res.data.message,res.data.status,res.data.username);
                    this.setState({signup:true});
                    }
                }
            ).catch(
                error => {
                    console.log(error);
                }
            )
        }
        this.setState({errormessage:err});
    }

    render()
    {
        if(!this.state.signup){
            return(
                <form className="signup" onSubmit={this.handleSubmit}>

                <label>Name:
                <input type="text" name="username" onChange={this.handleChange}/>
                </label>

                <label>MailId:
                <input type="email" name="email" onChange={this.handleChange}/>
                </label>

                <label>Generate Password:
                <input type="password" name="password" onChange={this.handleChange}/>
                </label>

                <label>ReEnter Password:
                <input type="password" name="Repassword" onChange={this.handleChange}/>
                </label>

                <input className="signupbutton" type="submit" value="SignUp" />
                {this.state.errormessage}
                </form>
            );
        }else{
            return(<Signin />);
        }
    }   
}


export default signup;