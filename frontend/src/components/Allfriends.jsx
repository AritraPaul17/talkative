import React, { useContext } from 'react'
import { FriendContext } from '../contexts/FriendContext'
import Spinner from '../helpers/Spinner'
import Friend from './Friend'

const Allfriends = () => {
  const { friends, isFetchingFriend } = useContext(FriendContext)

  if (isFetchingFriend) {
    return (
      <div className='h-full w-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='h-full flex flex-col gap-2'>
      {
        friends.length===0? <p>Add friends to start chat.</p>:
        friends?.map((friend,ind)=>{
          return( <Friend friend={friend} key={ind}/>)
        })
      }
    </div>
  )
}

export default Allfriends
