import React, { useContext } from 'react'
import { MessageContext } from '../contexts/MessageContext';
import { SocketContext } from '../contexts/SocketContext';

import {images} from '../functions/images.js'

const Friend = ({friend}) => {
const {  setMessanger,messanger,getMessages } = useContext(MessageContext);
const { onlineUsers } = useContext(SocketContext);

    const startChat = async()=>{
        setMessanger(friend);
        getMessages(friend._id);
    }

    const isOnline = onlineUsers.includes(friend._id);
    
    return (
        <div className={`w-full p-2 flex gap-3 items-center bg-gray-700 hover:bg-blue-800 cursor-pointer`}
            onClick={startChat}
        >
            <div>
                <img src={images[friend.profilepic]}
                    className='w-10 h-10 cursor-pointer rounded-full'
                    alt='profile'
                />
            </div>
            <div className='gap-1'>
                <h2 className='text-lg font-semibold'>{friend.username}</h2>
                <p className='text-sm text-green-500'>{isOnline ? "Online" : "Offline"}</p>
            </div>
        </div>
    )
}

export default Friend
