import './Messages.css';


function Messages(props){

    


    if(props.send === "true"){
    return(
            <p className="Message Message-send">
                <span className="Message-name">
                    Neeraj gupta
                </span>
                Hey, how are you!!!
                <span className="Message-date">
                {new Date().toUTCString()}
                </span>
            </p>
            
    )
    }
    return(
        <p className="Message">
            <span className="Message-name">
                Neeraj gupta
            </span>
            Hey, how are you!!!
            <span className="Message-date">
            {new Date().toUTCString()}
            </span>
        </p>
        
    )
}

export default Messages;