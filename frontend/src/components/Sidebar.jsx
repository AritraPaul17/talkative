import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import AllUsers from './AllUsers';
import Allfriends from './Allfriends';

import { images } from '../functions/images';


const Sidebar = () => {
    const { authUser } = useContext(UserContext);
    const [tab, setTab] = useState("users");

    return (
        <div className='w-full h-full'>

            <div className='h-[11%] flex items-center p-2 gap-4 bg-green-500'>
                <div>
                    <img src={images[authUser?.profilepic]}
                        className='w-10 h-10 cursor-pointer rounded-full'
                        alt='profile'
                    />
                </div>
                <div className='text-xl font-semibold'>{authUser.username}</div>
            </div>

            {/* tab button */}
            <div className='bg-gray-700 rounded-lg h-[7%] mb-2'>
                <div className='flex p-0.5'>
                    <button className={`w-1/2 text-md font-semibold text-white p-1 cursor-pointer rounded-xl ${tab == "friends" ? "bg-gray-900" : ""} `}
                        onClick={() => setTab("friends")}>
                        Friends
                    </button>

                    <button className={`w-1/2 text-md font-semibold text-white p-1 cursor-pointer rounded-xl ${tab == "users" ? "bg-gray-900" : ""} `}
                        onClick={() => setTab("users")}>
                        Users
                    </button>
                </div>
            </div>
            <div className='h-[80%] overflow-y-scroll scrollbar-hide'>
                {/* All friends / login component */}
                    {tab === "users" ? <AllUsers/> : <Allfriends/>
                }
            </div>
        </div>
    )
}

export default Sidebar
