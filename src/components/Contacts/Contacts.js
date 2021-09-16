import './Contacts.css';
import Avatar from '../Avatar/Avatar.js'
import {useContext, useState} from 'react';
import {Context} from '../context';
import axios from 'axios';

function Contact(props) {

    const [globalState, setGlobalState] = useContext(Context);
    const handleClick = async () => {
        let NewChat = true;
            for(let i=0;i<globalState.user.rooms.length;i++)
            {
                // console.log(props.contactName,globalState.user.rooms[i].name);
                if(props.contactName === globalState.user.rooms[i].name)
                {
                    NewChat= false;
                    break;
                }
            }
            
            if(NewChat){
                // console.log(NewChat);
                setGlobalState({user:globalState.user,
                    otherUsers:globalState.otherUsers,
                    chatName:props.contactName,
                    chatId:props.conatctId,
                    chatMessages:[],
                });
            }else{
                // console.log(NewChat);
                const Messages = await axios.get(`room/${props.conatctId}`).then(
                    (res) => {
                        // console.log(res.data.room.messages);
                        return res.data.room.messages;
                        // console.log(res.data.message,res.data.status);
                        }).catch(
                            error => {
                                console.log(error.message);
                            });
                setGlobalState({user:globalState.user,
                    otherUsers:globalState.otherUsers,
                    chatName:props.contactName,
                    chatId:props.conatctId,
                    chatMessages:Messages,
                });
            }
    }
    return(
        <div className="Contact" onClick={handleClick}>
        <Avatar/>
        <div className="Conatct-info">
            <h3>{props.contactName}</h3>
            <p>This is the last message....</p>
        </div>
        </div>

    )
}


export default Contact;