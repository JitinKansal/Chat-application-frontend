import './Contacts.css';
import Avatar from '../Avatar/Avatar.js'
import {useState,useContext,useEffect} from 'react';
import {Context} from '../context';
import axios from 'axios';

function Contact({socket,contactInfo}) {
    const [globalState, setGlobalState] = useContext(Context);
    const [seenMessages,setSeenMessages] = useState(contactInfo.seen);

    useEffect(()=>{
        if(globalState.chatId === contactInfo._id){
            setSeenMessages(true);
        }else{
            setSeenMessages(contactInfo.seen);
        }
    },[globalState]);

    const handleClick = async () => {
        let NewChat = true;
        for(let i=0;i<globalState.user.rooms.length;i++)
        {
            if(contactInfo.name === globalState.user.rooms[i].name)
            {
                NewChat= false;
                break;
            }
        }
            
        if(NewChat){
            // console.log(NewChat);
            setGlobalState({user:globalState.user,
                otherUsers:globalState.otherUsers,
                chatName:contactInfo.name,
                chatId:contactInfo._id,
                chatMessages:[],
            });
        }else{
            // console.log(NewChat);
            const Messages = await axios.get(`room/${contactInfo._id}`).then(
                async (res) => {
                    // console.log(res.data.room.messages);
                    if(seenMessages === false){
                        const updateWatchedMessage = {
                            userId : globalState.user.id,
                            roomId : contactInfo._id,
                        }
                        socket.emit("seenAllMessages",updateWatchedMessage,(res)=>{
                            console.log(res);
                        });
                        setSeenMessages(true);
                    }
                    return res.data.room.messages;
                    }).catch(
                        error => {
                            console.log(error.message);
                        });
            setGlobalState({
                user:globalState.user,
                otherUsers:globalState.otherUsers,
                chatName:contactInfo.name,
                chatId:contactInfo._id,
                chatMessages:Messages,
            });
            socket.emit("joinRoom", contactInfo._id);
        }
    }

    return(
        <div className={`${seenMessages ? "Watched" : "Unwatched"}`} onClick={handleClick}>
            <Avatar/>
            <div className="Conatct-info">
                <h3>{contactInfo.name}</h3>
                {contactInfo.lastMessage !== undefined && contactInfo.lastMessage.body !== undefined?<p>{contactInfo.lastMessage.body}</p>:<p></p>}
            </div>
        </div>
    )
}


export default Contact;