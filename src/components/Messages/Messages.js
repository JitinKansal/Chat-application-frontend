import './Messages.css';
import {useContext,useState} from 'react';
import {Context} from '../context';


function Messages(props){
    const [mymessage,setMymessage] = useState(false);
    const [globalState, setGlobalState] = useContext(Context);

    if(props.data.from === globalState.user.name){
        setMymessage(true);
    }
    
    console.log(mymessage);
    console.log(props);

    if(mymessage === true){
        return(
                <p className="Message Message-send">
                    {/* <span className="Message-name">
                    {props.sender}
                    </span> */}
                    {props.data.body}
                    <span className="Message-date">
                    {props.data.time}
                    </span>
                </p>
        )
    }else{
        return(
        <p className="Message">
            <span className="Message-name">
            {props.data.from}
            </span>
            {props.data.body}
            <span className="Message-date">
            {props.data.time}
            </span>
        </p>
    )
    }
}

export default Messages;