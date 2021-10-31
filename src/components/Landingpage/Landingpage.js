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
            <img src="./GIF/SnakeLogo.gif" alt="Logo/GIF"></img>
            <span></span>
            <span></span>
          </div>
          <div className="para">
            <p>SNAKE BITE</p>
          </div>
          <div className="CreatorInfo">
            <p>
              {"Contributors: "}
              <a href="https://www.linkedin.com/in/jitin-kansal-08345b18b/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i>JITIN KANSAL</a>
              {" & "}
              <a href="https://www.linkedin.com/in/harsh-vardhan-819314110/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i>HARSH VARDHAN</a>
            </p>
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
