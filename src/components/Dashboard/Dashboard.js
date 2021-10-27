import './Dashboard.css'
import Avatar from '../Avatar/Avatar'
import Contacts from '../Contacts/Contacts';
import {useContext, useState, useEffect} from 'react';
import {Context} from '../context';
import axios from 'axios';



const Dashboard = ({socket,parentCallback,InterfaceCallBack}) =>{
    // eslint-disable-next-line
    const [globalState, setGlobalState] = useContext(Context);
    const [SearchedContacts,setSearchedContacts]= useState([]);
    const [savedContacts,setSavedContacts]=useState();
    const [openDashboardSettings, setOpenDashboardSettings] = useState(false);

    useEffect(() => {
        setSavedContacts(globalState.user.rooms.map((val,key)=>{
            return(<Contacts key={key} socket={socket} contactInfo={val} InterfaceCallBack={InterfaceCallBack} />);
        }));
    }, [globalState])

    useEffect(() => {
        socket.on("receive_room",async (data)=>{
            // console.log(data);
            for(let i=0;i<data.members.length;i++)
            {
                if(globalState.user.name === data.members[i]){
                    let user = globalState.user;
                    let roomName;
                    if(data.name === undefined){
                        if(i===0){
                            roomName = data.members[1];
                        }else{
                            roomName = data.members[0];
                        }
                    }else{
                        roomName = data.name;
                    }
                    if(data.messages[0].from === globalState.user.name)
                    {
                        user.rooms = [...user.rooms,{
                            name:roomName,
                            _id:data._id,
                            seen:true,
                            unseenMessages:0,
                            lastMessage:data.messages[0],
                        }]
                        const updateWatchedMessage = {
                            userId : globalState.user.id,
                            roomId : data._id,
                        }
                        await socket.emit("seenAllMessages",updateWatchedMessage,(res)=>{
                            console.log(res);
                        });
                    }else{
                        user.rooms = [...user.rooms,{
                            name:roomName,
                            _id:data._id,
                            seen:false,
                            unseenMessages:1,
                            lastMessage:data.messages[0],
                        }]
                    }
                    user.rooms.sort((a,b)=>{
                        const timeOfa = new Date(a.lastMessage.time);
                        const timeOfb = new Date(b.lastMessage.time);
                        if(timeOfa > timeOfb){
                            return -1;
                        }else{
                            return 1;
                        }
                    });
                    await setGlobalState({user:user,
                        otherUsers:globalState.otherUsers.filter((val)=>{
                            if(val.name !== roomName )
                            {
                                return val;
                            }
                            return false;
                        }),
                        chatName:globalState.chatName,
                        chatId:globalState._id,
                        chatMessages:globalState.chatMessages,
                    });
                    break;
                }
            }
        });
    }, [socket]);

    
    const handleChange = async (event) =>{
        if(event.target.value==="" || event.target.value === undefined ){
            setSavedContacts(globalState.user.rooms.map((val,key)=>{
                return(<Contacts key={key} socket={socket} contactInfo={val} InterfaceCallBack={InterfaceCallBack}/>);
            }));
            setSearchedContacts([]);
        }else{
            const searchList = [...globalState.user.rooms,...globalState.otherUsers]
            setSearchedContacts(
                searchList.filter((val)=>{
                    if(val.name.toLowerCase().includes(event.target.value.toLowerCase())){
                        return val;
                    }else{
                        return null;
                    }}).map((val,key)=>{
                        const obj = {
                            name:val.name,
                            _id:val._id,
                            seen:true,
                            unseenMessages:0,
                            lastMessage:{body:"",from:"",time:""},
                        }
                    return(<Contacts key={key} contactInfo={obj} InterfaceCallBack={InterfaceCallBack}/>);
                    }),
            );
        }
    }

    const handleClickCreateGroup = async ()=>{
        socket.emit("all_users",globalState.user.name, async (res)=>{
            InterfaceCallBack(true,res.otherUsers);
        });
        setOpenDashboardSettings(!openDashboardSettings);
    }

    const handleClickSettings = async ()=>{
        
    }

    const handleClickLogOut = async ()=>{
        axios.get('user/logout').then((res) => {
            console.log(res.data.message,res.data.status);
            socket.disconnect();
            parentCallback({isSignin:false,socket:socket});
        }).catch(error => {
            console.log(error.message);
        });
        setOpenDashboardSettings(!openDashboardSettings);
    }
    
    return(
        <div className="dashboard">
            <div className="user">
                <Avatar />
                <h3>{globalState.user.name}</h3>
                <i className="fas fa-ellipsis-v" onClick={() => {setOpenDashboardSettings(!openDashboardSettings)}}></i>
            </div>
            {openDashboardSettings?
            <div className="dashboardDropDown">
                    <div onClick={handleClickCreateGroup}>Create New Snake Pit</div>
                    {/* <div onClick={handleClickSettings}>Settings</div> */}
                    <div onClick={handleClickLogOut}>Log Out</div>
            </div>
            :null}
            <div className="search-bar">
                <div className="search-bar-container">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder= "Search" onChange={handleChange}></input>
                </div>
            </div>
            <div className="contactsArea">
            {SearchedContacts.length>0?SearchedContacts:savedContacts}
            </div>
        </div>
    );
}

export default Dashboard;