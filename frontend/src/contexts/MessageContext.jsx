import { createContext, useState } from "react";
import { port } from "../utils/apis";
import { toast } from "react-toastify";

export const MessageContext = createContext();

export const MessageContextProvider = (props) => {
    const [messanger, setMessanger] = useState(null);
    const [messages,setMessages] = useState([]);
    const [isFetchingMessanger, setIsFetchingMessanger] = useState(false);
    const [isFetchingMessanges, setIsFetchingMessanges] = useState(false);

    const getMessages = async (id) => {
        const backendPort = `${port}/api/auth/getmessages/${id}`;
        setIsFetchingMessanges(true);
        try {
            let result = await fetch(backendPort, {
                credentials: 'include',
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            result = await result.json();
            
            if (!result.success) {
                toast.error(result.message);
                setMessages([]);
                return;
            }
            setMessages(result.data);

        } catch (err) {
            toast.error(err.message);
        }finally{
            setIsFetchingMessanges(false)
        }
    }

    return (
        <MessageContext.Provider value={{ messanger, isFetchingMessanger,messages, isFetchingMessanges, setMessanger ,getMessages,setMessages }}>
            {props.children}
        </MessageContext.Provider>
    )
}