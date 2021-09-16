import React,{useContext} from 'react';
import './Interface.css';
import Dashboard from '../Dashboard/Dashboard';
import Chat from '../Chat/Chat';
import {Context} from '../context';
import io from "socket.io-client";

const Interface = () => {
    const [globalState, setGlobalState] = useContext(Context);
        return(
            <div className="glass">
            <Dashboard/>
            <Chat/>
            </div>
        );
}

export default Interface;