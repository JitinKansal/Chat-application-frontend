import React,{useState} from 'react';
import './Landingpage.css';
import Signin from '../Signin/signin';
import Signup from '../Signup/signup';
import Interface from '../Interface/Interface';




const Landingpage = ()=>{

  const [isSignUpClicked,setSignUpClicked] = useState(false);
  const [isSignin,setIsSignin] = useState(false);
  const [socket,setSocket] = useState();
  const callbackFuction = (data)=>{
    // console.log(data);
    setIsSignin(data.isSignin);
    setSocket(data.socket);
  }

  if(!isSignin){
    return (
      <div className="Loading">

        <div className="logo">
          <div className="square">
              <span></span>
              <span></span>
              {/* <img src="./Snake-app-Icon.png" alt="Avatar"></img> */}
              <img src="./SnakeLogo.gif" alt="gif"></img>
              <span></span>
              <span></span>
          </div>
          <div className="para">
            <p>SNAKE BITE</p>
          </div>
        </div>
        
        <div className="accessSnake">
          {!isSignUpClicked?
          <div>
            <Signin parentCallback = {callbackFuction}/>
            <div className="Register">
                <div className="line"></div>
                <div className="button" onClick={()=>{setSignUpClicked(!isSignUpClicked)}}>SIGN UP</div>
            </div>
          </div>
          :<Signup/>
          }
        </div>
      </div>
    );
  }
  else{
    return(
          <Interface socket={socket} parentCallback = {callbackFuction}/>
          );
  }
} 

export default Landingpage;
