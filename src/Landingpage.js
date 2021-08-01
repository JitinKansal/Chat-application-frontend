import React,{Component} from 'react';
import './Landingpage.css';
import Signin from './signin';
import Signup from './signup';

class Landingpage extends Component{

  constructor() {
    super()
    this.state = {
      signin : false,
      signup : false,
      showButton : true,
    }
    this.openSigninPage= this.openSigninPage.bind(this)
    this.openSignupPage= this.openSignupPage.bind(this)
  }

  openSigninPage = () =>{
    console.log(this.state.signin)
    this.setState({
      signin:true,
      showButton:false,
    })
  }

  openSignupPage = () => {
    console.log(this.state.signup)
    this.setState({
      signup:true,
      showButton:false,
    })
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
        {this.state.showButton?
        <div className="buttons">
        <button onClick={this.openSigninPage}>Signin</button>
        <button onClick={this.openSignupPage}>Signup</button>
        </div>
         : null}
        {this.state.signin? <Signin/> :null}
        {this.state.signup? <Signup/> :null}
      </div>
  );
  } 
}

export default Landingpage;
