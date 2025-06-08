import { useContext, useEffect } from "react";

import { MessageContext } from "../contexts/MessageContext";
import { SocketContext } from "../contexts/SocketContext";


const UseListenMessage = ()=>{
    const {messages,setMessages} = useContext( MessageContext)
    const {socket} = useContext( SocketContext)
    useEffect(()=>{
        socket?.on('newMessage',(sendResult)=>{
            setMessages([...messages,sendResult]);
        })

        return ()=> socket.off("sendResult")
    },[messages,setMessages,socket])
}

export default UseListenMessage;