import React, {createContext, useEffect, useState} from 'react';
import BottomNavigator from "../components/BottomNavigator.js";
import LoginScreen from './LoginScreen.js';

export const tokenContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [rootStackRef, setRootStackRef] = useState(null);
    
    async function login(id, password){
        let message;
        return fetch("/api/v1/admin/login", {
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email" : id,
                "password": password
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(!res["success"])
            message = res["message"]
            else
            setToken(123);
            return message;
        })
        .catch(e => {
            console.error(e)
            setToken(123)
        })
    }

    function logout(){
        setToken(null);
    }

    return (
        <tokenContext.Provider value={{login, logout, token, setToken, rootStackRef, setRootStackRef}}>
            {token ? children : <LoginScreen />}
        </tokenContext.Provider>
    )
}