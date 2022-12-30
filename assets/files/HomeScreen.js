import React, {useEffect, useState} from "react";
import { AntDesign, Ionicons, Feather,  Entypo } from '@expo/vector-icons';
import Values from '../Values';
import { ScrollView, Text, View, StyleSheet, PermissionsAndroid, Pressable} from "react-native";

import data from './data'

export default function HomeScrren(props){
    var list = [1,2,3,4,5,6]
    let [low, sold] = [0, 0]

    return (
        <ScrollView contentContainerStyle={styles.homeContainer}>
            <Pressable style={{flexGrow: 1}}>
            <View style={styles.horizontal}>
                <View style={styles.horizontal1}>
                    <Text style={styles.boxText}> {list[0]} </Text>
                    <Text style={styles.boxText}>Orders</Text>
                </View>
                <View style={styles.horizontal1}>
                    <Text style={styles.boxText}> {list[1]} </Text>
                    <Text style={styles.boxText}>Customers</Text>
                </View>
                <View style={styles.horizontal1}>
                    <Text style={styles.boxText}> {list[2]} </Text>
                    <Text style={styles.boxText}>Products</Text>
                </View>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.sales_last_week}> Sales Last Week: <Text style={{fontSize:22}}>{"\n " + list[3]}</Text> </Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={{...styles.sales_last_week, ...styles.product_summary}}>
                    <Text style={{fontSize: 22}}>{low + "\n"}</Text> Low Stock Products
                </Text>
                <Text style={{...styles.sales_last_week, ...styles.product_summary}}>
                    <Text style={{fontSize: 22}}>{sold + "\n"}</Text> Sold Out Products
                </Text>
            </View>
            <View style={styles.vertical}>
                {
                    data.map( (data, index) => 
                        <CurrentOrder 
                        orderID={data.orderID}
                        time={data.time}
                        phone={data.phone}
                        name={data.name}
                        key={index}
                        />
                    )
                }
            </View>
            </Pressable>
        </ScrollView>
    )
}

function CurrentOrder(props){
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
            <View style={styles.current_order_v1}>
                <Text style={styles.order_v3_text}>More Details </Text>
                <AntDesign name="arrowright" size={22} color="black" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flexDirection: "column",
        flexGrow: 1,
    },
    horizontal : {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 12,
        marginHorizontal: 8,
    },
    horizontal1 : {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Values.white,
        marginHorizontal: 8,
        paddingVertical: 24,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.53,
        shadowRadius: 2.62,
        elevation: 12,
    },
    boxText: {
        color: Values.primary,
        fontWeight: 'bold',
        fontSize: 16
    }, 
    sales_last_week : {
        flex: 1,
        borderWidth: 0,        
        borderColor: Values.primary,
        borderRadius: 16,
        color: '#000',
        padding: 12,
        backgroundColor: Values.white,
        fontSize: 14,
        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 10,
        marginHorizontal: 8
    },
    product_summary :{
        borderColor: Values.black,
        borderWidth: 0,
        fontSize: 14,
        marginHorizontal: 8,
    },
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