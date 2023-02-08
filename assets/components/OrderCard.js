import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Ionicons, Feather,  Entypo } from '@expo/vector-icons';

import Values from '../config/Values';
import { useNavigation } from "@react-navigation/native";

export default function OrderCard(props){
    const navigation = useNavigation();
    const getcolor = () => {
        let n = Math.random()
        let col; //for color
        if( n < 0.25/*props.status === 'ordered' */) col = '#424141'
        else if( n < 0.5/*props.status === 'processing'*/) col = '#faa30c'
        else if( n < 0.75/*props.status === 'cancelled'*/) col = '#fa0702'
        else col = '#029613'
        return col
    }
    
    return (
        <View style={styles.current_order}>
            <View style={styles.current_order_v1}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>order: {props.orderID}</Text><Text>Order-time: {props.time}</Text>
            </View>
            <View style={styles.current_order_v1}>
                <View>
                    <View  style={styles.order_v2}>
                        <Ionicons name="person" size={22} color="black" />
                        <Text>   {props.name}</Text>
                    </View>
                    <View style={styles.order_v2}>
                        <Entypo name="phone" size={22} color="black" />
                        <Text>   {props.phone}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{...styles.current_order_status, backgroundColor: getcolor()}}>status{props.status}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.current_order_v1} onPress={ () => navigation.navigate("Order Details", {orderID:props.orderID}) }>
                <Text style={styles.order_v3_text} >More Details </Text>
                <AntDesign name="arrowright" size={22} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    current_order: {
        backgroundColor: Values.white,
        margin: 8,
        shadowColor: Values.black,
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 6,
        marginHorizontal: 16
    },
    current_order_v1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomColor: '#e4e4e4',
        borderBottomWidth: 1,
    },
    order_v2: {
        flexDirection: 'row',
        paddingLeft: 8,
        marginVertical: 4,
    },
    order_v3_text: {
        textAlign: 'right',
        alignItems: 'flex-end',
        marginLeft: 'auto',
        color: Values.primary,
        fontWeight: 'bold',
    },
    current_order_status: {
        shadowColor: Values.black,
        borderRadius: 2,
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 2,
        backgroundColor: Values.white,
        fontSize: 16,
        padding: 2,
        color: Values.white
    },
    current_order_processed : {
        color: Values.white,
    },
});