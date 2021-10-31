import './Messages.css';
import {useContext,useState,useEffect} from 'react';
import {Context} from '../context';

function Messages(props){
    const [globalState] = useContext(Context);
    const [mymessage,setMymessage] = useState(props.data.from=== globalState.user.name?true:false);

    useEffect(()=>{
        if(props.data.from === globalState.user.name){
            setMymessage(true);
        }else{
            setMymessage(false);
        }
    },[globalState.user.name,props.data.from]);
    
    if(mymessage === true){
        return(
            <p className="Message Message-sended">
                <span className="Message-body">
                    {props.data.body}
                </span>
                <span className="Message-date">
                    {props.data.time.split(" ")[1]+" "+props.data.time.split(" ")[2]+" "+props.data.time.split(" ")[3]+" "+props.data.time.split(" ")[4]}
                </span>
            </p>
        )
    }else{
        return(
            <p className="Message Message-received">
                <span className="Message-name">
                    {props.data.from}
                </span>
                <span className="Message-body">
                        {props.data.body}
                </span>
                <span className="Message-date">
                        {props.data.time.split(" ")[1]+" "+props.data.time.split(" ")[2]+" "+props.data.time.split(" ")[3]+" "+props.data.time.split(" ")[4]}
                </span>
            </p>
        )
    }
}

export default Messages;