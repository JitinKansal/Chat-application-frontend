import React,{useState}  from 'react';
import './Interface.css';
import Dashboard from '../Dashboard/Dashboard';
import Chat from '../Chat/Chat';
import CreateNewGroup from '../CreateNewGroup/CreateNewGroup';

const Interface = ({socket,parentCallback}) => {

  const [isCreateNewGroup,setIsCreateNewGroup] = useState(false);
  const [ParticipantsList,setParticipantsList] = useState([]);

  const InterfaceCallBack = (data,allUsers)=> {
    setIsCreateNewGroup(data);
    setParticipantsList([...allUsers]);
  }
  
  return(
    <div className="glass">
    <Dashboard socket={socket} parentCallback={parentCallback} InterfaceCallBack ={InterfaceCallBack} />
    {!isCreateNewGroup?<Chat socket={socket}/>:<CreateNewGroup socket={socket} ParticipantsList={ParticipantsList} InterfaceCallBack={InterfaceCallBack} />}
    </div>
  );
    
}

export default Interface;