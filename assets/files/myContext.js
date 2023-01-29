import React, {createContext, useEffect, useState} from 'react';
import BottomNavigator from "../components/BottomNavigator.js";
import LoginScreen from './LoginScreen.js';

export const tokenContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState(null);
    
    function login(id, password){
        //console.log(id);
        //if(id == "surya")
            setToken(id);
    }

    useEffect(() => {
        console.log(token)
    }, [token]);

    function logout(){
        setToken(null);
    }

    return (
        <tokenContext.Provider value={{login, logout, token, setToken}}>
            {token ? children : <LoginScreen />}
        </tokenContext.Provider>
    )
}