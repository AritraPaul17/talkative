import { createContext, useState } from "react";
import { port } from "../utils/apis";

export const FriendContext = createContext();

export const FriendContextProvider = (props) => {
    const [allUser, setAllUser] = useState([]);
    const [friends, setFriends] = useState([]);
    const [isFetchingUser, setIsFetchingUser] = useState(true);
    const [isAddingFriend, setIsAddingFriend] = useState(false);
    const [isFetchingFriend, setIsFetchingFriend] = useState(true);

    const fetchUsers = async () => {
        const token = localStorage.getItem('Talkative');
        const backendPort = `${port}/api/auth/getalluser`;
        setIsFetchingUser(true);
        try {
            let users = await fetch(backendPort, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token:token
                },
            })
            users = await users.json();
            if (!users.success) {
                setAllUser([]);
                return;
            }
            setAllUser(users.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsFetchingUser(false);
        }
    }

    const addFriend = async (id,newFriendDetails) => {
        const backendPort = `${port}/api/auth/addfriend`;
        const token = localStorage.getItem('Talkative');
        try {
            setIsAddingFriend(true);
            let result = await fetch(backendPort, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token:token
                },
                body:JSON.stringify({
                    id
                }),
            })
            result = await result.json();
            if (!result.success) {
                console.log(result);
                return {success:false,message:"Could not add to friend."};
            }
            setFriends(...friends,newFriendDetails)
            return {success:true,message:"Added to friend."};
        } catch (err) {
            console.log(err);
            return {success:false,message:"Could not add to friend."};
        } finally {
            setIsAddingFriend(false);
        }
    }

    const getFriends = async()=>{
        const backendPort = `${port}/api/auth/getfriends`;
        const token = localStorage.getItem('Talkative');

        setIsFetchingFriend(true);
        try {
            let result = await fetch(backendPort, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token:token
                },
            })
            result = await result.json();            
            if (!result.success) {
                setFriends([]);
                return;
            }
            setFriends(result.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsFetchingFriend(false);
        }
    }

    return (
        <FriendContext.Provider value={{ allUser, isFetchingUser, fetchUsers,friends, isAddingFriend, isFetchingFriend, addFriend,getFriends}}>
            {props.children}
        </FriendContext.Provider>
    )
}