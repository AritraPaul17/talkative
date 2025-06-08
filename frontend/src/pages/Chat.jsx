import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import { FriendContext } from '../contexts/FriendContext';
import Settings from '../components/Settings';
import Logout from '../components/Logout';
import { PageContext } from '../contexts/PageContext';


const Chat = () => {
  const { fetchUsers, getFriends } = useContext(FriendContext);
  const {showLogout} = useContext(PageContext)

  useEffect(() => {
    fetchUsers();
    getFriends();
  }, [])

  return (
    <div className='h-screen min-w-screen bg-gray-900 flex justify-center items-center' >
      <div className='h-[75%] w-[65%] bg-gray-800 border-2 border-amber-50'>
        <div className='h-8 bg-gray-700'> <Settings/> </div>
        <div className='h-full flex flex-row'>
          <div className='w-[30%] h-[calc(100%-32px)]  border-r-2 border-white'><Sidebar /></div>
          <div className='w-[70%] h-[calc(100%-32px)] '><ChatBox /></div>
        </div>
      </div>
      {showLogout ? <Logout/> : ""}
    </div>
  )
}

export default Chat
