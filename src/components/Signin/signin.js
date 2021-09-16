import React,{useState,useContext} from 'react';
import './signin.css';
import Interface from '../Interface/Interface';
import axios from 'axios';
import {Context} from '../context';


const Signin = () => {
   
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errormessage,setErrormessage] = useState('');
    const [isSignin,setIsSignin] = useState(false);
    const [globalState, setGlobalState] = useContext(Context);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username,password);
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
                    console.log(res.data.message,res.data.status);
                    setGlobalState({
                        user:res.data.user,
                        otherUsers:res.data.otherUsers,
                        chatName:" ",
                        chatId:" ",
                        chatMessages:[{}],
                    });
                    setIsSignin(true);
                    }).catch(
                        error => {
                            console.log(error.message);
                            console.log("name/password is incorrect");
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
                <Interface/>
        );
    }
}


export default Signin;