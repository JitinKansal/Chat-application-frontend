import React,{useState,useContext} from 'react';
import './signin.css';
import axios from 'axios';
import {Context} from '../context';
import io from "socket.io-client";

let socket;

const Signin = ({parentCallback}) => {
   
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errormessage,setErrormessage] = useState('');
    const [isSignin,setIsSignin] = useState(false);
    // eslint-disable-next-line
    const [globalState,setGlobalState] = useContext(Context);

    const handleSubmit = (event) => {
        event.preventDefault();
            let err = "";
        if(!username){
                err = <span className="credentialsWarning">Username is required!!!</span>;
        }   
        else if(!password){
                err = <span className="credentialsWarning">Password is required!!!.</span>;
        }
        else{
            const user={
                username:username,
                password:password,
            };
            axios.post('user/login',user).then(
             (res) => {
                console.log(res.data.message,res.data.status);
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
            socket = io.connect(process.env.REACT_APP_BACKEND_LINK);
            setIsSignin(true);
            }).catch(
                error => {
                    err = <span className="credentialsWarning">Username/Password is incorrect</span>;
                    setErrormessage(err);
                    console.log(error.message);
                }
            );
        }
        setErrormessage(err);
    }

    if(isSignin){
        parentCallback({isSignin,socket});
    }
    
    return(
        <form className="signin" onSubmit={handleSubmit}>

        <input className="input" type="text" name="username" placeholder="User Name" value={username} onChange={(e)=>setUsername(e.target.value)}/>

        <input className="input" type="password" name="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

        <input className="button" type="submit" value="SIGN IN" />
        {errormessage}
        </form>
    );
}

export default Signin;