import React,{Component} from 'react';
import './signup.css';

class signup extends Component{
    render()
    {
        return(
            <form className="signup" action="http://localhost:8080/api/v1/user/register" method="post">

            <label for="username">Name:
            <input type="text" name="username" />
            </label>

            <label for="email">MailId:
            <input type="email" name="email" />
            </label>

            <label for="password">Generate Password:
            <input type="password" name="password" />
            </label>

            {/* <label for="Repassword">ReEnter Password:
            <input type="password" name="Repassword" />
            </label> */}

            <input class="signupbutton" type="submit" value="Submit" />
            </form>
        );
    }
}


export default signup;