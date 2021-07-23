import './Contacts.css';
import Avatar from './Avatar.js'


function Contact() {
    return(
        <div className="Contact">
        <Avatar/>
        <div className="Conatct-info">
            <h3>Neeraj Gupta</h3>
            <p>This is the last message....</p>
        </div>
        </div>

    )
}


export default Contact;