import {useEffect, useState} from "react";
import { ScrollView, Text, View, StyleSheet, Image, useWindowDimensions, TouchableOpacity, Platform, ToastAndroid,} from "react-native";
import { orderById } from "./orderById";
import values from "../config/values";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "reactstrap";
import { getOrderById } from "../../api/orderController";
import ProductCardInOrderDetails from "../components/ProductCardInOrderDetails";

export default function OrderDetails({route}) {
    const {width, height} = useWindowDimensions();
    const navigation = useNavigation();
    const [data, setData] = useState({
        orderID: "",
        orderDate: "",
        customerName: "",
        phone: "",
        address: {
            0 : "", 1: "", 2: "", pincode: ""
        },
        summary: {
            grand_total: "",
            shipping_cost: "",
        },
        products: []
    });
    
    useEffect(()=> {        
        getOrderById( route?.params.orderID ? route?.params.orderID : '4')
        .then(res => {
            if(res !== null) 
                setData(res)
            else {
                if(Platform.OS == "android"){
                    ToastAndroid.show("Order Not Found", ToastAndroid.SHORT)
                }
                else {
                    console.log("Order Not Found")
                }
                throw new Error("Order Not Found")
            }
        })
        .catch(e => {
            console.error(e)
            setData(orderById);
        })
    }, [])

    
    return (
        <ScrollView style={styles.outerContainer}
          contentContainerStyle={styles.innerContainer}
        >
            <View style={{marginVertical: 16}}>
                <Text style={styles.heading}>Order ID: {data.orderID}</Text>
                <Text style={styles.field}>Date: <Text style={styles.value}>{data.order_date}</Text></Text>
            </View>
            <View style={{marginTop: 16, marginBottom: 16, paddingBottom: 16, borderBottomColor: '#d9d9d9', borderBottomWidth: 1,}}>
                <Text style={styles.field}>Ordered By: <Text style={styles.value}>{data.user?.name}</Text></Text>
                <Text style={{...styles.field, paddingBottom: 8}}>Phone: <Text style={styles.value}>{ data.user?.phone}</Text></Text>
                <Text style={styles.field}>Address: <Text style={styles.value}>{ "\n" + data.address[0] + "\n" + data.address[1] + "\n" + data.address[2] + "\n" + data.address.pincode}</Text></Text>
            </View>
            <View style={ width > 700 ? styles.productListContainerDesktop : styles.productListContainerMobile}>
                {data.products && data.products.map((d, ind) => {
                    return <ProductCardInOrderDetails data={d} index={ind} navigaiton={navigation}/>
                })}
            </View>
            <View style={{marginTop: 16, marginBottom: 16, paddingVertical: 16, borderTopColor: '#d9d9d9', borderTopWidth: 1, textAlign: 'right', flex: 1, alignItems: 'flex-end'}}>
                <Text>Order Summary</Text>
                <Text style={styles.field}>Shipping: <Text style={styles.value}>{data.shipping_price}</Text></Text>
                <Text style={styles.field}>Total: <Text style={styles.value}>{data.total_price}</Text></Text>
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
      width: '100%',
      flex: 1,  
      backgroundColor: values.white,
    },
    innerContainer: {
        width: '100%',
        maxWidth: 700,
        marginHorizontal: 'auto',
        padding: 16,
    },
    productListContainerDesktop: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    productListContainerMobile:{
        flexDirection: 'column',
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 16,
    },
    imageContainer: {
    },
    heading: {
        fontSize: values.fontLarge,
    },
    field: {
        color: 'grey',
        fontSize: values.fontxSmall - 1,
    },
    value: {
        color: 'black',
        fontSize: values.fontSmall,
    }
})