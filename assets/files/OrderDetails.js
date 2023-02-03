import {useEffect, useState} from "react";
import { ScrollView, Text, View, StyleSheet, PermissionsAndroid, Pressable, Image} from "react-native";
import { AuthContextProvider } from "./myContext";
import { orderById } from "./orderById";

export default function OrderDetails({route}) {
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
        // console.log(route?.params.orderID)
        // let url = "";
        // fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify({orderID: route?.params.orderID})
        // })
        // .then(res => res.json())
        // .then(res => setData(res))
        // .catch(e => {
        //     console.error(e)
        //     setData(orderById);
        // })
        setData(orderById);
    }, [])

    const getProduct = (props, index) => {
        return (
            <View style={styles.productContainer} key={index}>
                <View>
                <Image
                    resizeMode='cover'
                    style={styles.image}
                    source={require('../images/icon_150.png')} 
                    />
                </View>
                <View>
                    <Text style={styles.prodcutHead}>Name...</Text>
                    <Text>Product ID: {0}</Text>
                    <Text>Selling Price: {0}</Text>
                </View>
                <View>
                    <Text>Units Ordered: {0}</Text>
                    <Text>Total: {0}</Text>
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
                <Text>Order Date: {data.orderDate}</Text>
                <Text>Order ID: {data.orderID}</Text>
            </View>
            <View>
                <Text>Ordered By:</Text>
                <Text>{data.customerName}</Text>
                <Text>Phone: {data.phone}</Text>
                <Text>Address: {data.address[0] + "\n" + data.address[1] + "\n" + data.address[2] + "\n" + data.address.pincode}</Text>
            </View>
            <View>
                {data.products && data.products.map((d, ind) => getProduct(d, ind))}
            </View>
            <View>
                <Text>Order Summary</Text>
                <Text>Shipping: {data.summary.shipping_cost}</Text>
                <Text>Total: {data.summary.grand_total}</Text>
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