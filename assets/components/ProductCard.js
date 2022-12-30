import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

function ProductCard({ data }) {
  let { image, name, weight, price, avilable_qty } = data;
  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.cardImage}>
          <Image style={styles.image} source={image} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.productDetails}>
          <View style={styles.nameCntainer} >
            <Text style={styles.cardName}>{name}</Text>
          </View>
          <Text tyle={styles.weight}>{weight}</Text>
          <Text style={styles.price}>Price: ₹{price}</Text>
          <Text style={styles.quantity}>Available Qty: {avilable_qty}</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "white",
    margin: 5,
    alignItems: "center",
    flexDirection: "column",
    padding:5
  },
  cardImage: {
    margin: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 30,
    paddingBottom: 30,
  },
  image: {
    width: 150,
    height: 100,
    alignSelf: "center",
  },
  productDetails: {
    marginLeft: 10,
  },
  nameCntainer:{
    margin:5,
  },
  cardName: {
    fontSize: 25,
    fontWeight:"600"
  },
  price:{
    fontWeight:"500"
  },
  quantity: {
    color:"#4d90fe"
  }
});

export default ProductCard;
