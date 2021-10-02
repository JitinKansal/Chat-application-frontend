import React,{useState,useContext} from 'react';
import './signin.css';
import Interface from '../Interface/Interface';
import axios from 'axios';
import {Context} from '../context';
import io from "socket.io-client";

let socket;

const Signin = () => {
   
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errormessage,setErrormessage] = useState('');
    const [isSignin,setIsSignin] = useState(false);
    // eslint-disable-next-line
    const [globalState, setGlobalState] = useContext(Context);

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(username,password);
        let err = "";
        if(!username){
                err = <strong>Please provide the user name.</strong>;
        }   
        else if(!password){
                err = <strong>Please provide the password.</strong>;
        }
        else{
            const user={
                username:username,
                password:password,
            };
            axios.post('user/login',user).then(
                (res) => {
                    // console.log(res.data.message,res.data.status);
                    setGlobalState({
                        user:res.data.user,
                        otherUsers:res.data.otherUsers.filter(
                            (val)=>{
                                if(val.name !== res.data.user.name && res.data.user.rooms.filter((e)=>
                                {if(e.name===val.name){
                                    return e;
                                }
                                return false;
                                }).length === 0)
                                {
                                    return val;
                                }
                                return false;
                            }
                        ),
                        chatName:" ",
                        chatId:" ",
                        chatMessages:[],
                    });
                    socket = io.connect("http://localhost:4000");
                    setIsSignin(true);
                    }).catch(
                        error => {
                            err = <strong>{error.message}</strong>;
                            console.log(error.message);
                            // console.log("name/password is incorrect");
                        });
        }
        setErrormessage(err);
    }

    if(!isSignin){
        return(
            <div>
                <form className="signin" onSubmit={handleSubmit}>

                <label>Name:
                <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </label>

                <label>Password:
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </label>

                <input className="signinbutton" type="submit" value="SignIn" />
                {errormessage}
                </form>
            </div>
        );
    }else{
        return(
                <Interface socket={socket}/>
        );
    }
}


export default Signin;