import React, {useEffect, useState} from "react";
import Values from '../config/Values';
import { ScrollView, Text, View, StyleSheet, PermissionsAndroid, Pressable, TouchableOpacity} from "react-native";

import data from './data';
import OrderCard from "../components/OrderCard";

export default function HomeScrren({navigation}){
    var list = [1,2,3,4,5,6]
    let [low, sold] = [0, 0]

    return (
        <ScrollView contentContainerStyle={styles.homeContainer}>
            <Pressable style={styles.pressableContainer}>
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
                <Text style={styles.sales_last_week}> 
                    Sales Last Week: <Text style={{fontSize:22}}>{"\n " + list[3]}</Text> 
                </Text>
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
                        <OrderCard 
                        {...data}
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
    }   
});