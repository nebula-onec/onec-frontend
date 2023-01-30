import React from 'react';
import { View, StyleSheet, Image} from 'react-native';

import {getData} from '../Data';

function ProductDetailsScreen({route,navigation}) {
    console.log({navigation})
    const {itemId} = route.params;
    const productData=getData(itemId)
    console.log(productData);
    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require("../images/garlic.png")}></Image>
                </View>
            </View>
            <View style={styles.lowerContainer}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:12,
        shadowColor:"#000",
        shadowOpacity:0.5,
        shadowRadius: 2,
        flexDirection:"row",
        justifyContent:"center"
    },
    upperContainer:{
        flexDirection:"row",
    },
    imageContainer: {
        borderColor:"#000",
        borderWidth:1,
        alignItems:"center"
    },
    image: {
        width:250,
        height:250,
    },
    lowerContainer:{

    },
})

export default ProductDetailsScreen;