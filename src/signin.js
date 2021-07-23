import React,{Component} from 'react';
import './signin.css';

class signin extends Component{



    render()
    {
        return(
            <div className="signin">
                <label for="mail">MailId:</label>
                <input type="mail" name="mail"></input>
                <label for="password">MailId:</label>
                <input type="password" name="password"></input>
            </div>
        );
    }
}


export default signin;