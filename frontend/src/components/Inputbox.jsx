import React, { useContext, useState } from 'react'
import { port } from '../utils/apis';
import { toast } from 'react-toastify';
import { MessageContext } from '../contexts/MessageContext';

import { IoSend } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";

import EmojiPicker from 'emoji-picker-react';

const Inputbox = () => {
    const [text, setText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isEmojiPick, setIsEmojiPick] = useState(false);

    const { messanger, setMessages, messages } = useContext(MessageContext);
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


    const handleChange = (e) => {
        const { value } = e.target;
        setText(value);
    };

    const send = async () => {

        if(isEmojiPick){
            setIsEmojiPick(!isEmojiPick)
        }
        const backendPort = `${port}/api/auth/sendmessage/${messanger._id}`;
        const content = text.trim();
        if (content.length === 0) {
            return;
        }
        setIsSending(true);
        try {
            const token = localStorage.getItem("Talkative");
            let result = await fetch(backendPort, {
                credentials: 'include',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token
                },
                body: JSON.stringify({
                    content
                })
            })
            result = await result.json();
            if (!result.success) {
                toast.error(result.message, toastOptions);
                return;
            }

            setMessages([...messages, result.data]);

        } catch (err) {
            toast.error(err.message, toastOptions);
            console.log(result);
        } finally {
            setIsSending(false)
        }
        setText("");
    }

    return (
        <div className='h-full w-full flex items-center py-1 px-2 bg-gray-700 relative'>

            {isEmojiPick ? <div className='w-30% absolute left-1 bottom-[100%] '>
                <EmojiPicker className='w-full max-h-96'
                  onEmojiClick={(e)=>{setText(text+e.emoji)}}
                />
            </div>:
            ""
            }

            <button className={`text-3xl font-semibold rounded-2xl cursor-pointer mr-2`}
                onClick={()=>setIsEmojiPick(!isEmojiPick)}
                disabled={!messanger ? true : false}
            >
                <CiFaceSmile/>
            </button>

            <div className='w-[87%] h-[90%] mr-2 rounded-2xl'>
                <textarea placeholder='Type message here...'
                    className='w-full h-full text-md p-2 border-2 border-white rounded-2xl'
                    onChange={handleChange}
                    value={text}
                    disabled={!messanger ? true : false}
                />
            </div>

            
            <button className={`${isSending ? "bg-green-800" : "bg-green-600"} px-3 py-2 text-lg font-semibold rounded-2xl cursor-pointer`}
                onClick={send}
                disabled={!messanger ? true : false}
            >
                <IoSend />
            </button>
        </div>
    )
}

export default Inputbox
