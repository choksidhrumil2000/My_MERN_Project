import { createContext, useState } from "react"

export const loginContext = createContext();
export const LoginContextProvider = ({children})=>{
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    return (
        <loginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
            {children}
        </loginContext.Provider>
    );

}