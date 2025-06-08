import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const Message = ({content}) => {
  const {authUser} = useContext(UserContext)
  // bg-green-700
  return (
    <div className={`w-full flex mb-3 ${content.senderId!==authUser._id ? "justify-start":"justify-end"}`}>
      <div className={`min-w-min max-w-[70%] ${content.senderId!==authUser._id ? "bg-blue-600":"bg-green-600"} py-1.5 px-2 rounded-lg text-white`}>
        {content.content}
      </div>
    </div>
  )
}

export default Message
