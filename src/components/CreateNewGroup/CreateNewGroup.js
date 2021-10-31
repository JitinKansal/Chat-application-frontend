import {useContext, useState} from 'react';
import './CreateNewGroup.css';
import {Context} from '../context';


const CreateNewGroup = ({socket,ParticipantsList,InterfaceCallBack}) => {
    const [globalState] = useContext(Context);
    const [GroupName, setGroupName] = useState("");
    const [SelectedParticipants,setSelectedParticipants] = useState([]);

    const onChangeInput = (event) =>{
        setGroupName(event.target.value);
    };

    const handleClickSubmit = ()=>{
        const room = {
            name: GroupName,
            members:[...SelectedParticipants,globalState.user.name],
            body:"Hello every one, I have created this group for socialising with each other",
            from:globalState.user.name,
            time:new Date(),
        }
        socket.emit("create_room",room, async (res)=>{
            if(res.error){
                console.log(res);
            }
        });
        InterfaceCallBack(false,[]);
    }

    return(
        <div className="CreateNewGroup-area">
            <div className="header">
                <h3>Create New Snake Pit</h3>
            </div>
            <div className="SelectedParticipants">
                {SelectedParticipants.map((val,key)=>{
                    return(<span key={key}>{val}<i className="fas fa-times" onClick={()=>{
                        SelectedParticipants.splice(key,1)
                        setSelectedParticipants([...SelectedParticipants]);
                    }}></i></span>);
                })}
            </div>
            <div className="Add-Participants">
                <h4>Add Participants</h4>
                <div className="ParticipantsList">
                {ParticipantsList.map((val,key)=>{return(<div key={key} onClick={()=>{setSelectedParticipants([...SelectedParticipants,val])}}><i className="fas fa-plus"></i>{val}</div>);})}    
                </div>
            </div>
            {SelectedParticipants.length>=1?
                <div className="Submit">
                <input className="GroupName" type="text" name="GroupName" value={GroupName} placeholder="Snake Pit Subject" onChange={onChangeInput}></input>
                {GroupName?
                    <span ><i className="far fa-check-circle" onClick={handleClickSubmit}></i></span>
                    :null
                }
                </div>
                :null
            }
        </div>
    )
}

export default CreateNewGroup;