import './Dashboard.css'
import Avatar from '../Avatar/Avatar'
import Contacts from '../Contacts/Contacts';
import {useContext, useState} from 'react';
import {Context} from '../context';


const Dashboard = () =>{
    const [globalState, setGlobalState] = useContext(Context);
    const [SearchedContacts,setSearchedContacts]= useState([]);

    const [savedContacts,setSavedContacts]=useState(
        globalState.user.rooms.map((val,key)=>{
        return(<Contacts contactName={val.name} conatctId={val._id}/>);
    }));

    const handleChange = async (event) =>{
       setSearchedContacts(
            globalState.otherUsers.filter((val)=>{
                if(event.target.value===""){
                    return null;
                }else if(val.user.toLowerCase().includes(event.target.value.toLowerCase())){
                    return val;
                }else{
                    return null;
                }}).map((val,key)=>{
                return(<Contacts contactName={val.user} conatctId={val.id}/>);
                }),
            );
    }
    
    return(
        <div className="dashboard">
            <div className="user">
                <Avatar />
                <h3>{globalState.user.name}</h3>
                <i className="fas fa-ellipsis-v"></i>
            </div>
            <div className="search-bar">
                <div className="search-bar-container">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search or start new chat" onChange={handleChange}></input>
                </div>
            </div>
            {SearchedContacts.length>0?SearchedContacts:savedContacts}
        </div>
    );
}

export default Dashboard;