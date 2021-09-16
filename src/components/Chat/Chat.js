import {useContext, useState} from 'react';
import Avatar from '../Avatar/Avatar';
import './Chat.css';
import Messages from '../Messages/Messages.js'
import {Context} from '../context';
import axios from 'axios';


const Chat = () => {
    const [globalState, setGlobalState] = useContext(Context);
    const [MessageText,setMessageText] = useState("");

    const [displayMessages,setDisplayMessages] = useState([]);
    //     ()=>{
    //     if(globalState.chatMessages.length > 0){
    //     globalState.chatMessages.map((val)=>{
    //         console.log(val);
    //         return(<Messages data={val}/>);
    //     })}}
    // );
    
    // if(globalState.chatMessages.length > 0){
    //     setDisplayMessages(globalState.chatMessages.map((val)=>{
    //         // console.log(val);
    //         return(<Messages data={val}/>);
    //     }))
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target.elements[0].value);
        event.target.elements[0].value = ""
        event.target.value="";
        if(MessageText !== ""){
            
            var create_newRoom = true;
            for(let i=0;i<globalState.user.rooms.length;i++)
            {
                if(globalState.chatName === globalState.user.rooms[i].name)
                {
                    create_newRoom= false;
                    break;
                }
            }
            if(create_newRoom){
                const room = {
                    members:[globalState.user.name,globalState.chatName],
                    body:MessageText,
                    from:globalState.user.name,
                    time:Date(),
                }
                axios.post('create_room',room).then(
                    (res) => {
                        // console.log(res.data.room);
                        console.log(res.data.message,res.data.status);
                        setGlobalState({user:globalState.user,
                            otherUsers:globalState.otherUsers,
                            chatName:globalState.chatName,
                            chatId:globalState.chatId,
                            chatMessages:[...globalState.chatMessages,
                                {body:room.body,from:room.from,time:room.time}],
                        });
                        }).catch(
                            error => {
                                console.log(error.message);
                            });
            }else{
                const messageObj = {
                    body:MessageText,
                    from:globalState.user.name,
                    time:Date(),
                }
                axios.post(`room/send_message/${globalState.chatId}`,messageObj).then(
                    (res) => {
                        console.log(res.data.message,res.data.status);
                        // console.log(res.data.room);

                        setGlobalState({user:globalState.user,
                            otherUsers:globalState.otherUsers,
                            chatName:globalState.chatName,
                            chatId:globalState.chatId,
                            chatMessages:[...globalState.chatMessages,messageObj],
                        });
                    }).catch(
                            error => {
                                console.log(error.message);
                            });
            }
        }
    }

    if(globalState.chatName!==" " ){
        return(
            <div className="chating-area">
                <div className="connection-header">
                    <Avatar/>
                    <div className="connection-info">
                        <h3>{globalState.chatName}</h3>
                        <p>Last Seen At...</p>
                    </div>
                    <div className="connection-right">
                        <i class="fas fa-search"></i>
                        <i class="fas fa-paperclip"></i>
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                </div>
                <div className="Message-body">
                    {displayMessages}
                    {/* {globalState.chatMessages} */}
                </div>
                <div className="chat-footer">
                    <i className="far fa-smile"></i>
                    <form onSubmit={handleSubmit}>
                    <input type="text" name="SendMessageBar" placeholder="   Type a message" onChange={(e)=>setMessageText(e.target.value)}></input>
                    <button>send message</button>
                    </form>
                    <i className="fas fa-microphone"></i>
                </div>
            </div>
        )
    }else{
        return(
            <div className="chating-area">
                <div className="connection-header">
                </div>
                <div className="Message-body">
                </div>
                <div className="chat-footer">
                </div>
            </div>
        )
    }
}


export default Chat;