import './Contacts.css';
import Avatar from '../Avatar/Avatar.js'
import {useState,useContext,useEffect} from 'react';
import {Context} from '../context';
import axios from 'axios';

function Contact({socket,contactInfo,InterfaceCallBack}) {
    const [globalState, setGlobalState] = useContext(Context);
    const [seenMessages,setSeenMessages] = useState(contactInfo.seen);

    // console.log(globalState.user.rooms.seen);

    useEffect(()=>{
        if(globalState.chatId === contactInfo._id){
            setSeenMessages(true);
        }else{
            setSeenMessages(contactInfo.seen);
        }
    },[globalState]);

    const handleClick = async () => {
        InterfaceCallBack(false,[]);
        let NewChat = true;
        var User = globalState.user
        for(let i=0;i<User.rooms.length;i++)
        {
            if(contactInfo.name === User.rooms[i].name)
            {
                NewChat= false;
                User.rooms[i].seen = true;
                break;
            }
        } 
        if(NewChat){
            setGlobalState({user:User,
                otherUsers:globalState.otherUsers,
                chatName:contactInfo.name,
                chatId:contactInfo._id,
                chatMessages:[],
            });
        }else{
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
                user:User,
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