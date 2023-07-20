import {useState, useEffect, useContext} from 'react';
import { View, Text, SliderComponent, StyleSheet, Image } from 'react-native';
import { tokenContext } from './myContext';

export default function SplashScreen({ navigation }){
    const {token} = useContext(tokenContext);
    
    useEffect(() => {
        token != null ? console.log("token found") : console.log("token not found")
        console.log(token)
        setTimeout( () => {navigation.replace( token ? "Main" : "Login")}, 5);
    }, []);
    
    return (
        <View style={styles.main}>
            <Image 
              resizeMode='contain'
              style={styles.child}
              source={require('../images/icon_512.png')}
            />
            <Image
            resizeMode='contain'
            style={styles.loading}
            source={require('../images/loading.gif')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    child: {
        width: '70%',
        height: '30%',
    },
    loading: {
        marginTop: 24,
        width: 48,
        height: 248
    }
})