import {useState, useEffect} from 'react';
import { View, Text, SliderComponent, StyleSheet, Image } from 'react-native';
//import logo from '../images/icon_150.png'

export default function SplashScreen({ navigation }){
    const [time, setTime] = useState(0);
    useEffect(() => {
        setTimeout( () => {navigation.replace("Login")}, 4000);
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