import React, {createContext, useState} from 'react';

export const tokenContext = createContext("");

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState("");
    
    function login(prop){
        setToken(prop);
    }
    function logout(){
        setToken("");
    }

    return (
        <tokenContext.Provider value={{login, logout, token, setToken}}>
            {children}
        </tokenContext.Provider>
    )
}