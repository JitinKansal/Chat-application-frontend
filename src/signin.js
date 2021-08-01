import React,{Component} from 'react';
import './signin.css';

class signin extends Component{
    render()
    {
        return(
            <div>
                <form className="signin" action="http://localhost:8080/api/v1/user/login" method="post">

                <label for="email">MailId:
                <input type="email" name="email"/>
                </label>

                <label for="password">password:
                <input type="password" name="password"/>
                </label>

                <input class="signinbutton" type="submit" value="Submit" />
                </form>
                
            </div>
        );
    }
}


export default signin;