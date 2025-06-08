import React, { useContext } from 'react'
import { FriendContext } from '../contexts/FriendContext'
import { toast } from 'react-toastify'

import { images } from '../functions/images.js'

const SideUser = ({ chatUser }) => {
    const { addFriend, friends, getFriends } = useContext(FriendContext);

    const toastOptions = {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }
    const addToFriend = async () => {
        if (friends) {
            for (let i = 0; i < friends.length; i++) {
                if (friends[i]._id === chatUser._id){
                    toast.warn(`${chatUser.username} is already a friend.`,toastOptions)
                    return;
                }       
            }
        }
        const result = await addFriend(chatUser._id,chatUser);
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        toast.success(result.message);
        getFriends()
    }
    
    return (
        <div className='w-full p-2 flex gap-3 items-center bg-gray-700 hover:bg-blue-800 cursor-pointer'
            onClick={addToFriend}
        >
            <div>
                <img src={images[chatUser.profilepic]}
                    className='w-10 h-10 cursor-pointer rounded-full'
                    alt='profile'
                />
            </div>
            <div className='gap-1'>
                <h2 className='text-lg font-semibold'>{chatUser.username}</h2>
            </div>
        </div>
    )
}

export default SideUser
