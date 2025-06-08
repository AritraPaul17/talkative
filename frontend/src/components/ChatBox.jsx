import React, { useContext } from 'react'
import Messages from './Messages'
import Inputbox from './Inputbox'
import { MessageContext } from '../contexts/MessageContext'
import Spinner from '../helpers/Spinner'

import {images} from '../functions/images.js'

const ChatBox = () => {
    const { messanger, isFetchingMessanger } = useContext(MessageContext);

    if (isFetchingMessanger) {
        return (
            <div className='h-full w-full flex justify-center items-center'>
                <Spinner />
            </div>
        )
    }
    
    return (
        <div className='h-full w-full pb-1'>
            <div className='h-[11%] flex items-center p-2 gap-4 bg-blue-600 mb-3'>
                {messanger?<div>
                    <img src={images[messanger.profilepic]}
                        className='w-10 h-10 cursor-pointer rounded-full'
                        alt='profile'
                    />
                </div> :
                <></>
                }
                {messanger?<div className='text-xl font-semibold'>{messanger.username}</div>:<></>}
            </div>
            <div className='h-[74.2%] p-2'>
                {messanger?<Messages />:<EmptyBox/>}
            </div>
            <div className='h-[13%] shadow-xl'><Inputbox /></div>
        </div>
    )
}

export default ChatBox
const EmptyBox = ()=>{
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <h1>Select a Friend to start chat.</h1>
        </div>
    )
}