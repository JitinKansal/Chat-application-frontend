import React,{Component} from 'react';
import './Landingpage.css';
import './signin';
import './signup';

class Landingpage extends Component{

  constructor() {
    super();
    this.state={

    }
  }

  openSigninPage = () => {
    console.log("signin");
    return(
      <signin/>
    );
  }

  openSignupPage = () => {
    console.log("signup");
    return(
      <signup/>
    );
  }

  render() {
    return (
      <div className="Loading">
        <div className="square">
            <span></span>
            <span></span>
            <img src="./Snake-app-Icon.png"></img>
            <span></span>
            <span></span>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="para">
            <p>Snake Bite</p>
        </div>
        <div className="buttons">
          <button onClick={this.openSigninPage}>Signin</button>
          <button onClick={this.openSignupPage}>Signup</button>
        </div>
      </div>
  );
  } 
}

export default Landingpage;
