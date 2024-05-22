import React, {createContext, useEffect, useState} from 'react';
import {serverUrl, url} from '../config/url.js';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform , ToastAndroid} from 'react-native';
import LoginScreen from './LoginScreen'

export const tokenContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [rootStackRef, setRootStackRef] = useState(null);

    async function deleteToken(key) {
        await SecureStore.deleteItemAsync(key);
        let result = await SecureStore.getItemAsync('token');
        AsyncStorage.setItem('available', '0');
        console.log(result)
    }
    async function isLoggedIn() {
        try {
            let av = await AsyncStorage.getItem('available')
            if(av == '1') setToken(123);            
        } catch (error) {
            console.log('error in logincheck for web')
            console.log(error)
        }

        if(Platform.OS == 'android'){
            let result = await SecureStore.getItemAsync('token');
            if(result) {
                if(Platform.OS == 'android') ToastAndroid.show('Logging in...', ToastAndroid.SHORT)
                setToken(result)
            }
            else console.log('error while getting key')
        }        
    }
    async function save(){
        await SecureStore.setItemAsync('token', "1234");
    }

    useEffect(() => {
        isLoggedIn()
    }, [])
    
    async function login(id, password){
        let message;
        return fetch(serverUrl + "/api/admin/login", {
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
                if(Platform.OS == "android"){
                    save()
                    isLoggedIn()
                }
                else{
                    setToken(1)
                }
                AsyncStorage.setItem('available', '1');
                // AsyncStorage.setItem('available', '1');
            }
            return message;
        })
        .catch(e => {
            console.error(e)
            console.log("error in mycontext fetch")
            setToken(123)
        })
        // setToken(123);
    }

    function logout(){
        setToken(null);
        if(Platform.OS == "android")
        deleteToken('token');
    }

    return (
        <tokenContext.Provider value={{login, logout, token, setToken, rootStackRef, setRootStackRef}}>
            {token ?  children: <LoginScreen/>}
        </tokenContext.Provider>
    )
}