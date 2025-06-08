import { createContext, useContext, useEffect, useState } from "react";
import { port } from "../utils/apis";
import { UserContext } from "./UserContext";
import io from 'socket.io-client';
import { MessageContext } from "./MessageContext";

export const SocketContext = createContext();

export const SocketContextProvider = (props) => {
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const { authUser } = useContext(UserContext);
    const { setMessages,messages } = useContext(MessageContext);

    useEffect(()=>{
        if(authUser){
            const socket = io(port,{
                query:{
                    userId:authUser._id
                }
            })
            setSocket(socket)

            socket.on('getOnlineUsers',(online)=>{setOnlineUsers(online)})
            
            return ()=> socket.close();
        }
        else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
        
    },[authUser])

    return (
        <SocketContext.Provider value={{ socket,onlineUsers }}>
            {props.children}
        </SocketContext.Provider>
    )
}