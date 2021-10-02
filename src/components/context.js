import React,{useState,createContext} from 'react';


export const Context = createContext();

export const GlobalState = (props) =>{
    const [globalState, setGlobalState] = useState({
        user:{},
        otherUsers:[],
        chatName:"",
        chatId:"",
        chatMessages:[{}],
    });
    return(
        <Context.Provider value={[globalState,setGlobalState]}>
            {props.children}
        </Context.Provider>
    );
}