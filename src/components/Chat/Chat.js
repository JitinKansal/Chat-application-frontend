import {useContext, useState,useEffect,useRef} from 'react';
import Avatar from '../Avatar/Avatar';
import './Chat.css';
import Messages from '../Messages/Messages.js'
import {Context} from '../context';
import Picker,{SKIN_TONE_DARK} from 'emoji-picker-react';


const Chat = ({socket}) => {
    const [globalState, setGlobalState] = useContext(Context);
    const [displaySendBtn,setDisplaySendBtn] = useState(false);
    const [smileyClicked,setSmileyClicked] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [displayMessages,setDisplayMessages] = useState([]);
    const [openChatSettings, setOpenChatSettings] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if(globalState.chatMessages !== undefined && globalState.chatMessages.length > 0){
            setDisplayMessages(globalState.chatMessages.map((val,key)=>{
                return(<Messages key={key} data={val}/>);
            }));
        }else{
            setDisplayMessages([]);
        }
      }, [globalState]);

    useEffect(() => {
        if(globalState.chatId !== undefined){
            socket.on("receiveMessage",async (data)=>{
                const index = globalState.user.rooms.findIndex(element => element._id === data.roomId);
                if(globalState.chatId === data.roomId && data.message.from !== globalState.user.name){
                    let user = globalState.user;
                    if(user.rooms[index].seen === false){
                        const updateWatchedMessage = {
                            userId : globalState.user.id,
                            roomId : data.roomId,
                        }
                        socket.emit("seenAllMessages",updateWatchedMessage,(res)=>{
                            if(res.error){
                                console.log(res);
                            }
                        }); 
                    }
                    user.rooms[index].seen = true;
                    user.rooms[index].unseenMessages = 0;
                    user.rooms[index].lastMessage = data.message;
                    user.rooms.sort((a,b)=>{
                        const timeOfa = new Date(a.lastMessage.time);
                        const timeOfb = new Date(b.lastMessage.time);
                        if(timeOfa > timeOfb){
                            return -1;
                        }else{
                            return 1;
                        }
                    });
                    setGlobalState({user:user,
                        otherUsers:globalState.otherUsers,
                        chatName:globalState.chatName,
                        chatId:globalState.chatId,
                        chatMessages:[...globalState.chatMessages,data.message],
                    }); 
                    
                }else if(data.message.from !== globalState.user.name && index !== -1){
                    let user = globalState.user;
                    user.rooms[index].seen = false;
                    user.rooms[index].unseenMessages = 1;
                    user.rooms[index].lastMessage = data.message;
                    user.rooms.sort((a,b)=>{
                        const timeOfa = new Date(a.lastMessage.time);
                        const timeOfb = new Date(b.lastMessage.time);
                        if(timeOfa > timeOfb){
                            return -1;
                        }else{
                            return 1;
                        }
                    });
                    setGlobalState({
                        user:user,
                        otherUsers:globalState.otherUsers,
                        chatName:globalState.chatName,
                        chatId:globalState.chatId,
                        chatMessages:globalState.chatMessages,
                        });
                }
            });
        }
      }, [globalState,socket,setGlobalState]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [displayMessages]);

    const onChangeInput = (event) =>{
        setMessageText(event.target.value);
        if(event.target.value === "" || event.target.value === undefined)
        {
            setDisplaySendBtn(false);
        }else{
            setDisplaySendBtn(true);
        }
    };

    const onSmileClick = (event) =>{
        if(smileyClicked){
            setSmileyClicked(false);
        }else{
            setSmileyClicked(true);
        }
    };

    const onEmojiClick = (event, emojiObject) => {
        setMessageText( messageText + emojiObject.emoji );
        setDisplaySendBtn(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(messageText !== ""){
            var create_newRoom = true;
            let index;
            for(index=0;index<globalState.user.rooms.length;index++)
            {
                if(globalState.chatName === globalState.user.rooms[index].name)
                {
                    create_newRoom= false;
                    break;
                }
            }
            if(create_newRoom){
                const room = {
                    name: undefined,
                    members:[globalState.user.name,globalState.chatName],
                    body:messageText,
                    from:globalState.user.name,
                    time:Date(),
                }
                socket.emit("create_room",room, async (res)=>{
                    if(res.error){
                        console.log(res);
                    }
                });
                
            }else{
                const messageObj = {
                    body:messageText,
                    from:globalState.user.name,
                    time:Date(),
                }
                const data = {
                    roomId:globalState.chatId,
                    message:messageObj
                }
                socket.emit("sendMessage",data,async(res)=>{
                    if(res.error){
                        console.log(res);
                    }
                    if(res !== undefined){
                        let user = globalState.user;
                        user.rooms[index].seen = true;
                        user.rooms[index].unseenMessages = 0;
                        user.rooms[index].lastMessage = data.message;
                        user.rooms.sort((a,b)=>{
                            const timeOfa = new Date(a.lastMessage.time);
                            const timeOfb = new Date(b.lastMessage.time);
                            if(timeOfa > timeOfb){
                                return -1;
                            }else{
                                return 1;
                            }
                        });
                        setGlobalState({user:user,
                            otherUsers:globalState.otherUsers,
                            chatName:globalState.chatName,
                            chatId:globalState.chatId,
                            chatMessages:[...globalState.chatMessages,messageObj],
                        });  
                    }
                });
            }
        }
        event.target.elements[0].value = "";
        setMessageText("");
    }

    const handleClearMessage = ()=>{
        const data = {
            roomId:globalState.chatId,
            userId:globalState.user.id,
        };
        setOpenChatSettings(!openChatSettings);
        socket.emit("clear_messages",data,async(res)=>{
            if(res.error){
                console.log(res);
            }
            if(res.message !== undefined){
                const index = globalState.user.rooms.findIndex(element => element._id === data.roomId);
                let user = globalState.user;
                user.rooms[index].seen = true;
                user.rooms[index].unseenMessages = 0;
                user.rooms[index].lastMessage = "";
                setGlobalState({user:user,
                otherUsers:globalState.otherUsers,
                chatName:globalState.chatName,
                chatId:globalState.chatId,
                chatMessages:[],
                });  
            }
        })
    }

    const handleDeleteChat = ()=>{
        const data = {
            roomId:globalState.chatId,
            chatName:globalState.chatName,
            userId:globalState.user.id,
        };
        setOpenChatSettings(!openChatSettings);
        socket.emit("delete_room",data,async(res)=>{
            if(res.error){
                console.log(res);
            }
            if(res.message !== undefined){
                let user = globalState.user;
                for(let i=0;i<user.rooms.length;i++){
                    if(user.rooms[i]._id === globalState.chatId)
                    {
                        user.rooms.splice(i, 1);
                        break;
                    }
                }
                let otherUsers = globalState.otherUsers;
                if(res.obj.name !== undefined){
                    otherUsers.push(res.obj);
                }
                setGlobalState({user:user,
                    otherUsers:otherUsers,
                    chatName:" ",
                    chatId:"",
                    chatMessages:[],
                });  
            }
        })
    }

    if(globalState.chatName!==" " ){
        return(
            <div className="chating-area">

                <div className="connection-header">
                    <Avatar/>
                    <div className="connection-info">
                        <h3>{globalState.chatName}</h3>
                        {/* <p>Last Seen At...</p> */}
                    </div>
                    <div className="connection-right">
                        {/* <i class="fas fa-search"></i> */}
                        {/* <i class="fas fa-paperclip"></i> */}
                        <i class="fas fa-ellipsis-v" onClick={() => {setOpenChatSettings(!openChatSettings)}}></i>
                    </div>
                    {openChatSettings?
                    <div className="chatDropDown">
                        <div onClick={handleClearMessage}>Clear Messages</div>
                        <div onClick={handleDeleteChat}>Delete Chat</div>
                    </div>
                    :null}
                </div>

                <div className="Message-body">
                    {displayMessages}
                    <div ref={messagesEndRef}></div>
                </div>

                {smileyClicked?<Picker onEmojiClick={onEmojiClick}
                skinTone={SKIN_TONE_DARK}
                pickerStyle={{ 
                    width: '100%',
                    background:'none',
                    height: '10rem',
                    border: 'none',
                    boxShadow: 'none',

                }} 
                disableSearchBar = {true}
                disableAutoFocus = {true}
                // groupVisibility={{
                //     recently_used: false,
                //   }}
                groupNames={{
                    smileys_people: '',
                    animals_nature: '',
                    food_drink: '',
                    travel_places: '',
                    activities: '',
                    objects: '',
                    symbols: '',
                    flags: '',
                    recently_used: '',
                    }}
                />:null}

                <div className="chat-footer">
                    <i className="far fa-smile" onClick={onSmileClick}></i>
                    <form onSubmit={handleSubmit}>
                    <input type="text" name="SendMessageBar" placeholder="Type a message" value={messageText} onChange={onChangeInput}></input>
                    {displaySendBtn?<button className="display"><i className="fas fa-caret-right"></i></button>
                    :<button className="hide"><i className="fas fa-caret-right"></i></button>}
                    </form>
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