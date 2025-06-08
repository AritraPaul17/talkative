import React, { useContext } from 'react'
import User from './User.jsx';
import { FriendContext } from '../contexts/FriendContext.jsx';
import Spinner from '../helpers/Spinner.jsx';

const AllUsers = () => {
const {allUser, isFetchingUser, isAddingFriend} = useContext(FriendContext);

if( isFetchingUser || isAddingFriend){
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <Spinner/>
    </div>
  )
}
  return (
    <div className='h-full flex flex-col gap-2'>
      {
        allUser?.map((chatUser)=>{
          return( <User key={chatUser._id} chatUser={chatUser}/>)
        })
      }
    </div>
  )
}

export default AllUsers
