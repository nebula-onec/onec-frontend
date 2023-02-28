import React, {useContext, useEffect, useState} from "react";
import values from '../config/values';
import { ScrollView, Text, View, StyleSheet, PermissionsAndroid, Pressable, TouchableOpacity, ToastAndroid, Platform, RefreshControl} from "react-native";
import {url} from "../config/url";

import data from './data';
import OrderCard from "../components/OrderCard";
import { tokenContext } from "./myContext";

export default function HomeScrren({navigation}){
    const {logout} = useContext(tokenContext);
    const [homeData, setHomeData]= useState({
        orders: 0,
        n_customers: 0,
        n_products: 0,
        unavailable_products: 0,
        n_sold: 0,
        unfulfilled_orders: {
            number: 0,
            orders: [
                {
                    order_id: 0,
                    order_date: "2023-02-14T06:03:40.000Z",
                    order_status: 1,
                    user_id: 0,
                    name: "Sample Name"
                }
            ]
        }
    });

    useEffect(() => {
        
        fetch(url + "/api/v1/admin/home", {
            credentials: 'include',
        })
        .then(res => {
            if(res.status == 401) {
                if(Platform.OS == "android") ToastAndroid.show("Please Login again for security", ToastAndroid.SHORT);
                console.log("401 detected in home screen")
                logout();
            }
            return res.json()
        })
        .then(res => {
            if(res.success){
                setHomeData(res.info)
            }
            else {
                console.log('error in homescreen fetch request')
            }
        })
        .catch(e => {
            console.log("HomeScreen fetch error", e)
        })
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.homeContainer}>
            <Pressable style={styles.pressableContainer}>
            <View style={styles.horizontal}>
                <View style={styles.horizontal1}>
                    <Text style={styles.boxText}> {homeData.orders} </Text>
                    <Text style={styles.boxText}>Orders</Text>
                </View>
                <View style={styles.horizontal1}>
                    <Text style={styles.boxText}> {homeData.n_customers} </Text>
                    <Text style={styles.boxText}>Customers</Text>
                </View>
                <View style={styles.horizontal1}>
                    <Text style={styles.boxText}> {homeData.n_products} </Text>
                    <Text style={styles.boxText}>Products</Text>
                </View>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.sales_last_week}> 
                    Sales Last Week: <Text style={{fontSize:22}}>{"\n " + homeData.n_sold}</Text> 
                </Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={{...styles.sales_last_week, ...styles.product_summary}}>
                    <Text style={{fontSize: 22}}>{0 + "\n"}</Text> Low Stock Products
                </Text>
                <Text style={{...styles.sales_last_week, ...styles.product_summary}}>
                    <Text style={{fontSize: 22}}>{homeData.unavailable_products + "\n"}</Text> Sold Out Products
                </Text>
            </View>
            <View style={styles.vertical}>
                {
                    homeData.unfulfilled_orders.orders.map( (data, index) => 
                        <OrderCard 
                        orderID={data.order_id}
                        time={data.order_date}
                        status={data.order_status}
                        userId={data.user_id}
                        name={data.name}
                        phone={data.phone}
                        key={index}
                        />
                    )
                }
            </View>
            </Pressable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flexDirection: "column",
        flexGrow: 1,
    },
    pressableContainer: {
        cursor: 'auto',
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
        backgroundColor: values.white,
        marginHorizontal: 8,
        paddingVertical: 24,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.53,
        shadowRadius: 2.62,
        elevation: 12,
    },
    boxText: {
        color: values.primary,
        fontWeight: 'bold',
        fontSize: 16
    }, 
    sales_last_week : {
        flex: 1,
        borderWidth: 0,        
        borderColor: values.primary,
        borderRadius: 16,
        color: '#000',
        padding: 12,
        backgroundColor: values.white,
        fontSize: 14,
        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 10,
        marginHorizontal: 8
    },
    product_summary :{
        borderColor: values.black,
        borderWidth: 0,
        fontSize: 14,
        marginHorizontal: 8,
    }   
});