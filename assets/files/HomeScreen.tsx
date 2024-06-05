import React, { useEffect, useState} from "react";
import values from '../config/values';
import { ScrollView, Text, View, StyleSheet, Pressable} from "react-native";

import OrderCard from "../components/OrderCard";
import { getHomeScreenData } from "../../api/homeController";
import { HomeScreenData } from "../../types/home";

export default function HomeScrren(){
    const [homeData, setHomeData] = useState<HomeScreenData>({} as HomeScreenData);
    const [screenMessage, setScreenMessage] = useState("Loading...");

    useEffect(() => {
        getHomeScreenData()
        .then(res => {
            if(res === null) throw new Error("Server Not Responding");
            setHomeData(res);
        })
        .catch(e => {
            setScreenMessage("Error while fetching data. " + e )
        })
    }, [])

    return (
        homeData ? <ScrollView contentContainerStyle={styles.homeContainer}>
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
            <View>
                {
                    homeData?.unfulfilled_orders?.map( (data, index) => 
                        <OrderCard 
                        order_id={data.order_id}
                        order_date={data.order_date}
                        order_status={data.order_status}
                        user_id={data.user_id}
                        name={data.name}
                        phone={data.phone}
                        key={index}
                        />
                    )
                }
            </View>
            </Pressable>
        </ScrollView>
        : <Text>{screenMessage}</Text>
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