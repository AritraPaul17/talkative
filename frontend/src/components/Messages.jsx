import React, { useContext, useEffect, useRef } from 'react'
import Message from './Message'
import Spinner from '../helpers/Spinner.jsx';
import { MessageContext } from '../contexts/MessageContext';
import UseListenMessage from '../hooks/ListenMessages.jsx';

import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = () => {
  const { messages, isFetchingMessanges } = useContext(MessageContext);
  UseListenMessage()
  if (isFetchingMessanges) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }
  return (
    <ScrollToBottom className='w-full h-full p-2 pr-0 flex flex-col'>
      {messages.length===0 ? <div>Start chat.</div>:
      messages.map((content,ind)=>{
        return (
          <Message content={content} key={ind}/>
        )
      })
      }
    </ScrollToBottom>
  )
}

export default Messages
