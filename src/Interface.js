import React,{Component} from 'react';
import './Interface.css';
import Dashboard from './Dashboard.js';
import Chat from './Chat.js';

class Interface extends Component{
    render(){
        return(
            <div className="glass">
            <Dashboard />
            <Chat/>
            </div>
        );
    }
}

export default Interface;