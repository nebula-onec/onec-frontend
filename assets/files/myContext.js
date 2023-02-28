import React, {createContext, useEffect, useState} from 'react';
import {url} from '../config/url.js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import LoginScreen from './LoginScreen'

export const tokenContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [rootStackRef, setRootStackRef] = useState(null);

    async function deleteToken(key) {
        await SecureStore.deleteItemAsync(key);
        let result = await SecureStore.getItemAsync('token');
        console.log(result)
    }
    async function getValueFor() {
        let result = await SecureStore.getItemAsync('token');
        if(result) {
            setToken(result)
        }
        else console.log('error while getting key')
    }
    async function save(){
        await SecureStore.setItemAsync('token', "1234");
    }

    useEffect(() => {
        if(Platform.OS == "android"){
            getValueFor()
            console.log(token)
        }
    }, [])
    
    async function login(id, password){
        let message;
        let url2 = url;
        return fetch(url2 + "/api/v1/admin/login", {
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
            if(res["success"] != true){
                message = res["message"]
            }
            else{
                setToken(123);
                if(Platform.OS == "android"){
                    save()
                    console.log(getValueFor('token'))
                }
            }
            return message;
        })
        .catch(e => {
            console.error(e)
        })
    }

    function logout(){
        setToken(null);
        deleteToken('token');
    }

    return (
        <tokenContext.Provider value={{login, logout, token, setToken, rootStackRef, setRootStackRef}}>
            {token ?  children: <LoginScreen/>}
        </tokenContext.Provider>
    )
}