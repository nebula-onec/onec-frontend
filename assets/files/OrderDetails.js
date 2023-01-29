import {useEffect, useState} from "react";
import { ScrollView, Text, View, StyleSheet, PermissionsAndroid, Pressable, Image} from "react-native";
import { AuthContextProvider } from "./myContext";

export default function OrderDetails(props) {

    const [data, setData] = useState({});
    const [products, setProd] = useState([]);
    useEffect(()=> {
        fetch("http://192.168.0.105:8005/api/v1/admin/login", {
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email" : "adarshrawat.run@gmail.com",
                "password": "12345678"
            })
        })
        .then(res => res.json())
        .then(res => console.log(res))
        // .then(res => setData(res))
    }, [])

    const getProduct = (props, ind) => {
        return (
            <View style={styles.productContainer} key={ind}>
                <View>
                <Image
                    resizeMode='cover'
                    style={styles.image}
                    source={require('../images/icon_150.png')} 
                    />
                </View>
                <View>
                    <Text style={styles.prodcutHead}>{props.name}</Text>
                    <Text>Product ID: {props.id}</Text>
                    <Text>Selling Price: {props.price}</Text>
                </View>
                <View>
                    <Text>Units Ordered: {props.count}</Text>
                    <Text>Total: {props.count * props.price}</Text>
                </View>
            </View>
        )
    }
    
    return (
        <ScrollView style={styles.outerContainer}
          contentContainerStyle={styles.innerContainer}
        >
            <Text>Order Details</Text>
            <View>
                <Text>Order Date: {data.date}</Text>
                <Text>Order ID: {data.id}</Text>
            </View>
            <View>
                <Text>Ordered By:</Text>
                <Text>{data.name}</Text>
                <Text>Phone: {data.phone}</Text>
                <Text>Address: {data.address}</Text>
            </View>
            <View>
                {data.products && data.products.map((d, ind) => getProduct(d, ind))}
            </View>
            <View>
                <Text>Order Summary</Text>
                <Text>Items: {data.items}</Text>
                <Text>Total: {data.total}</Text>
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
      width: '100%',
      flex: 1,  
    },
    innerContainer: {
        maxWidth: 500,
        marginHorizontal: 'auto',
    },
    productContainer: {
        display: "flex",
        flexDirection: "row"
    },
    image: {
        width: 150,
        height: 150,
    }
})