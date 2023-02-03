import {useEffect, useState} from "react";
import { ScrollView, Text, View, StyleSheet, PermissionsAndroid, Pressable, Image, useWindowDimensions} from "react-native";
import { AuthContextProvider } from "./myContext";
import { orderById } from "./orderById";
import values from "../config/values";

export default function OrderDetails({route}) {
    const {width, height} = useWindowDimensions();
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
    const [products, setProd] = useState([]);
    
    useEffect(()=> {
        console.log(route?.params.orderID)
        // http://192.168.0.106:8005/api/v1/admin/order/
        let url = "";
        fetch(url + route?.params.orderID, {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.success)
            setData(res.order)
            else throw error
        })
        .catch(e => {
            console.error(e)
            setData(orderById);
        })
    }, [])

    const Product = (props, index) => {
        return (
            <View style={ width > 700 ? styles.productContainerDesktop : styles.productContainerMobile} key={index}>
                <View style={styles.imageContainer}>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={require('../images/icon_150.png')} 
                        />
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.prodcutHead}>Name...asdk dkjad dasd askd kadkasd</Text>
                    <Text style={styles.field}>Product ID: <Text style={styles.value}></Text></Text>
                    <Text style={styles.field}>Selling Price: <Text style={styles.value}></Text></Text>
                    <Text style={styles.field}>Units Ordered: <Text style={styles.value}></Text></Text>
                    <Text style={styles.field}>Total: <Text style={styles.value}></Text></Text>
                </View>
            </View>
        )
    }
    
    return (
        <ScrollView style={styles.outerContainer}
          contentContainerStyle={styles.innerContainer}
        >
            <Text>Order Details</Text>
            <View style={{marginVertical: 16}}>
                <Text style={styles.heading}>Order ID: {data.orderID}</Text>
                <Text style={styles.field}>Date: <Text style={styles.value}>{data.orderDate}</Text></Text>
            </View>
            <View style={{marginTop: 16, marginBottom: 16, paddingBottom: 16, borderBottomColor: '#d9d9d9', borderBottomWidth: 1,}}>
                <Text style={styles.field}>Ordered By: <Text style={styles.value}>{data.customerName}</Text></Text>
                <Text style={{...styles.field, paddingBottom: 8}}>Phone: <Text style={styles.value}>{ data.phone}</Text></Text>
                <Text style={styles.field}>Address: <Text style={styles.value}>{ "\n" + data.address[0] + "\n" + data.address[1] + "\n" + data.address[2] + "\n" + data.address.pincode}</Text></Text>
            </View>
            <View style={ width > 700 ? styles.productListContainerDesktop : styles.productListContainerMobile}>
                {data.products && data.products.map((d, ind) => Product(d, ind))}
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
    productContainerMobile: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 16,
        padding: 16,
        backgroundColor: '#f1f1f1',
        borderRadius: 16,
    },
    productContainerDesktop: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 16,
        padding: 16,
        backgroundColor: '#f1f1f1',
        borderRadius: 16,
        width: '47%',
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