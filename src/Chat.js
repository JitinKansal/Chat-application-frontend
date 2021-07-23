import Avatar from './Avatar.js';
import './Chat.css';
import Messages from './Messages.js'




function Chat(){

    return(
        <div className="chating-area">
            <div className="connection-header">
                <Avatar/>
                <div className="connection-info">
                    <h3>Neeraj Gupta</h3>
                    <p>Last Seen At...</p>
                </div>
                <div className="connection-right">
                    <i class="fas fa-search"></i>
                    <i class="fas fa-paperclip"></i>
                    <i class="fas fa-ellipsis-v"></i>
                </div>

            </div>
            <div className="Message-body">
                <Messages/>
                <Messages send="true"/>
                <Messages/>
                <Messages/>
                <Messages send="true"/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages send="true"/>
                
            </div>
            <div className="chat-footer">
                <i class="far fa-smile"></i>
                <form>
                <input type="text" placeholder="   Type a message"></input>
                <button>send message</button>
                </form>
                <i class="fas fa-microphone"></i>
            </div>
        </div>
    )
}


export default Chat;