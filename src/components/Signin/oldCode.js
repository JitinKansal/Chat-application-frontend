import React,{Component} from 'react';
import './signin.css';
import Interface from '../Interface/Interface';
import axios from 'axios';
import {GlobalState} from '../context';

class signin extends Component{
    constructor(props){
        super(props);
        this.state ={
            username:"",
            password:"",
            errormessage:"",
            signin:false,
            user:{},
            otherUsers:[],
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
            console.log(this.state.username,this.state.password);
            let err = "";
            if(!this.state.username){
                    err = <strong>Please provide the user name.</strong>;
            }   
            else if(!this.state.password){
                    err = <strong>Please provide the password.</strong>;
            }
            else{
                const user={
                    username:this.state.username,
                    password:this.state.password,
                };
            axios.post('login',user).then(
                    (res) => {
                        console.log(res.data.message,res.data.status);
                        // console.log(res.data.user);
                       this.setState({signin:true,user:res.data.user,otherUsers:res.data.otherUsers});
                        }).catch(
                            error => {
                                console.log(error.message);
                                console.log("name/password is incorrect");
                            });
            }
            this.setState({errormessage:err});
    }

    render()
    {
        if(!this.state.signin){
            return(
                <div>
                    <form className="signin" onSubmit={this.handleSubmit}>

                    <label>Name:
                    <input type="text" name="username" onChange={this.handleChange}/>
                    </label>

                    <label>Password:
                    <input type="password" name="password" onChange={this.handleChange}/>
                    </label>
                    
                    <input className="signinbutton" type="submit" value="SignIn" />
                    {this.state.errormessage}
                    </form>
                </div>
            );
        }else{
            return(
                <GlobalState>
                    <Interface user={this.state.user} otherUsers={this.state.otherUsers}/>
                 </GlobalState>
            );
        }
    }
}


export default signin;