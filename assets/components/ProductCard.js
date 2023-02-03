import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailsScreen from "../Screens/ProductDetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";

const { width } = Dimensions.get("window");
let col = 1;
let container_width;
let flexDirection;
if (width <= 500) {
  col = 1;
  flexDirection = "row";
  container_width = width - 20;
} else {
  col = parseInt(width / 250);
  if (col > 4) {
    col = 4;
  }
  flexDirection = "column";
  container_width = parseInt(width / col) - 20;
}

function ProductCard({ data, navigation, root }) {
  let { image, name, weight, price, avilable_qty, id } = data;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ProductDetails", { itemId: id })}
    >
      <View style={styles.cardImage}>
        <Image style={styles.image} source={image[0].image} resizeMode="contain" />
      </View>
      <View style={styles.productDetails}>
        <View style={styles.nameCntainer}>
          <Text style={styles.cardName}>{name}</Text>
        </View>
        <View style={styles.extraDetailsContainer}>
          <View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>Price : </Text>
              <Text>₹{price}</Text>
            </View>
            <View style={styles.weightContainer}>
              <Text tyle={{ color: "green" }}>{weight}</Text>
            </View>
          </View>
          <View style={styles.avilableQtyContainer}>
            <Text style={styles.quantity}>Available Qty: </Text>
            <Text>{avilable_qty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignSelf: "center",
    backgroundColor: "white",
    margin: 12,
    marginHorizontal: 5,
    alignItems: "center",
    flexDirection: flexDirection,
    padding: 8,
    width: container_width,
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
    flex: 1,
    width: "100%",
  },
  nameCntainer: {
    margin: 5,
    alignSelf: "center",
  },
  cardName: {
    fontSize: 25,
    fontWeight: "600",
    color: "#878787",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  extraDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    color: "#484848",
  },
  avilableQtyContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  quantity: {
    color: "#AC4646",
  },
});

export default ProductCard;
