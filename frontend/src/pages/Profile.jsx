import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { images } from '../functions/images';
import { Link } from 'react-router-dom';

import { FaCameraRetro } from "react-icons/fa";

const Profile = () => {
    const { authUser } = useContext(UserContext);
    
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='min-h-max w-4/6 md:w-2/5 p-3 md:p-4 bg-gray-800 border-2 border-fuchsia-500 flex flex-col justify-start gap-3'>
                <div className='w-20 md:w-36 h-20 md:h-36 m-auto rounded-full flex justify-center items-center border-4 border-emerald-600'>
                    <img src={images[authUser.profilepic]} className='w-full h-full rounded-full' />
                    
                </div>

                <Link to={`/setavatar`}
                className='w-max mx-auto bg-gray-900 hover:bg-gray-600 border-1 border-red-50 px-3 py-2 rounded-2xl text-sm mb-1.5 cursor-pointer flex items-center gap-2'
                >
                    <FaCameraRetro/> Change Picture
                </Link>

                <div className='w-full'>
                    <input type='text' 
                    value={authUser.username}
                    disabled
                    className='w-full bg-gray-900 border-1 border-red-50 px-3 py-2 rounded-2xl text-lg mb-1.5'
                    />
                    <p className='text-red-700 text-sm'>*Username can not be changed.</p>
                </div>
                <div className='w-full'>
                    <input type='email' 
                    value={authUser.email}
                    disabled
                    className='w-full bg-gray-900 border-1 px-3 py-2 rounded-2xl text-lg mb-1.5'
                    />
                    <p className='text-red-700 text-sm'>*Email id can not be changed.</p>
                </div>
                <div className='w-full'>
                    <p>Account created at {authUser.createdAt}</p>
                </div>
                <div className='w-full'>
                    <p>Account last updated at {authUser.updatedAt}</p>
                </div>
                
                <div className='w-full'></div>
            </div>
        </div>
    )
}

export default Profile
