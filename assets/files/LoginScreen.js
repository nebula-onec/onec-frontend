import React, { useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokenContext } from './myContext';

export default function LoginScreen({navigation}){

    const {token, setToken, login} = useContext(tokenContext);
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("Welcome!");

    useEffect(() => {
        if(Platform.OS == 'web'){
            // console.log(document.cookie.token)
        }
    })

    return (
        <SafeAreaView style={st.container}>
            <Image 
            resizeMode='contain'
            style={st.image}
            source={require('../images/icon_150.png')}
            />
            <View style={st.container2}>
                <Text style={st.welcome}>{message}</Text>
                <TextInput placeholder='Email' style={st.inbox} onChangeText={setId}/>
                <TextInput placeholder='Password' style={st.inbox}
                  onChangeText={setPassword}
                  textContentType={'password'}
                  secureTextEntry={true}
                />
                <TouchableOpacity
                style={st.button1} onPress={() => login(id, password).then(res=> setMessage(res))}>
                    <Text style={st.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const st = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',

    },
    image: {
        width: 150,
        height: 100,
        alignSelf: 'center',
    },
    container2: {
        width: '100%',
        padding: 24,
        justifyContent: 'center',
        alignContent: 'center',
        maxWidth: 500,
        margin: 'auto',
        marginTop: 48,
    },
    welcome : {
        fontSize: 22,
        marginBottom: 24,
    },
    inbox: {
        height: 48,
        fontSize: 16,
        backgroundColor: '#d8d8d8',
        borderRadius: 24,
        paddingHorizontal: 16,
        marginBottom: 16,
        color: '#595959',
        shadowColor: '#000',
        //elevation: 5,
    },
    button1: {
        minWidth: 200,
        maxWidth: 200,
        borderRadius: 50,
        paddingHorizontal: 12,
        backgroundColor: '#4d90fe',
        height: 48,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignContent: 'center',
        fontWeight: 'bold',
        shadowColor: '#000',
        elevation: 5,
        shadowOpacity: 0.4,
        shadowRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
})