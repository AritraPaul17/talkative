import { createContext, useState } from "react";
import { port } from "../utils/apis";

export const PageContext = createContext();

export const PageContextProvider = (props) => {
    const [showLogout,setShowLogout] = useState(false);
    return (
            <PageContext.Provider value={{showLogout,setShowLogout }}>
                {props.children}
            </PageContext.Provider>
        )
}