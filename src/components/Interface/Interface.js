import React from 'react';
import './Interface.css';
import Dashboard from '../Dashboard/Dashboard';
import Chat from '../Chat/Chat';

const Interface = ({socket}) => {

  return(
    <div className="glass">
    <Dashboard socket={socket}/>
    <Chat socket={socket}/>
    </div>
  );
    
}

export default Interface;