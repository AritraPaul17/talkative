import { createContext, useState } from "react";
import { port } from "../utils/apis";

export const UserContext = createContext();

export const UserContextProvider = (props) => {

  const [authUser, setAuthUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const getUser = async () => {
    const backendPort = `${port}/api/auth/getuser`;
    const token = localStorage.getItem('Talkative');
    try {
      const userData = await fetch(backendPort, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token:token
        },
      })
      const result = await userData.json();
      if (!result.success) {
        setAuthUser(null);
        return;
      }
      setAuthUser(result.data);
    } catch (err) {
      console.log(err);
    }finally{
      setIsCheckingAuth(false);
    }
  }
  
  return (
    <UserContext.Provider value={{ authUser, isCheckingAuth,getUser }}>
      {props.children}
    </UserContext.Provider>
  )
}