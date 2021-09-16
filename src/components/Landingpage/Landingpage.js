import React,{Component} from 'react';
import './Landingpage.css';
import {Link} from 'react-router-dom';

class Landingpage extends Component{

  constructor() {
    super()
    this.state = {
    }
  }
  render() {
    return (
      <div className="Loading">
        <div className="square">
            <span></span>
            <span></span>
            {/* <img src="./Snake-app-Icon.png" alt="Avatar"></img> */}
            <img src="./SnakeLogo.gif" alt="gif"></img>
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
        <br></br>
        <br></br>
        <Link className="buttons" to={'/signin'}>Signin</Link>
        <Link className="buttons" to={'/signup'}>Signup</Link>
        <div>
        </div>
      </div>
  );
  } 
}

export default Landingpage;
