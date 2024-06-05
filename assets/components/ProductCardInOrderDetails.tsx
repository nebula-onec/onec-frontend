import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import {ProductInOrderDetails} from "../../types/product";
import values from "../config/values";

interface data {
    data: ProductInOrderDetails;
    index: number;
    navigation: any;
}

const ProductCardInOrderDetails: React.FC<data> = ({ data, index, navigation }) => {
    const {width} = useWindowDimensions();
    
        return (
                <Pressable
                    onPress={() => navigation.navigate("ProductDetails", {itemId: data.id})}
                    style={ width > 700 ? styles.productContainerDesktop : styles.productContainerMobile}
                    key={index}
                >
                    <View>
                        <Image
                            resizeMode='cover'
                            style={styles.image}
                            source={require('../images/icon_150.png')} 
                            />
                    </View>
                    <View style={{flex: 1}}>
                        <Text>Name: <Text style={styles.value}>{data.product_name}</Text></Text>
                        <Text style={styles.field}>Product ID: <Text style={styles.value}>{data.id}</Text></Text>
                        <Text style={styles.field}>Selling Price: <Text style={styles.value}>{data.price}</Text></Text>
                        <Text style={styles.field}>Units Ordered: <Text style={styles.value}>{data.quantity}</Text></Text>
                        <Text style={styles.field}>Total: <Text style={styles.value}> {data.total_for_this_product}</Text></Text>
                    </View>
                </Pressable>
        )
}
export default ProductCardInOrderDetails;

const styles = StyleSheet.create({
    
    field: {
        color: 'grey',
        fontSize: values.fontxSmall - 1,
    },
    value: {
        color: 'black',
        fontSize: values.fontSmall,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 16,
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
});
