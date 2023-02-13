import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { getData } from "../Data";
import values from "../config/values";

function ProductDetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  const { width } = useWindowDimensions();
  const productData = getData(itemId);
  
  const [fullImageId, setFullImageId] = useState(0);
  
  const ListProductImages = ({ item }) => {
    
    const {imageId}=item;
    return (
      <TouchableOpacity
        onPress={() => {
          setFullImageId(imageId);
        }}
      >
        <Image source={item.image} style={{ width: 50, height: 50 }} />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { flexDirection: `${width < 350 ? "column" : "row"}` },
      ]}
    >
      <View style={styles.upperContainer}>
        <View style={styles.imageSliderContainer}>
          <Image
            style={styles.image}
            source={productData.image[fullImageId].image}
          />
          <View style={{ flex: 1, overflow: "hidden", width: "100%" }}>
            <FlatList
              data={productData.image}
              keyExtractor={(item) => item.imageId}
              renderItem={ListProductImages}
              horizontal={true}
            />
          </View>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{productData.name}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: values.fontSmall }}>Price: </Text>
          <Text style={{ fontSize: 22 }}>₹ {productData.price}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: values.fontSmall }}>Weight: </Text>
          <Text style={{ fontSize: 22 }}>{productData.weight}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: values.fontSmall }}>
            Available Quantity:{" "}
          </Text>
          <Text style={{ fontSize: 22 }}>{productData.avilable_qty}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: values.fontSmall }}>
            Country Of Origin:{" "}
          </Text>
          <Text style={{ fontSize: 22 }}>{productData.avilable_qty}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: values.fontSmall }}>Description: </Text>
          <Text style={{ fontSize: 22 }}>{productData.avilable_qty}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: values.fontSmall }}>: </Text>
          <Text style={{ fontSize: 22 }}>{productData.avilable_qty}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    justifyContent: "center",
    backgroundColor: "white",
    flexWrap: "wrap",
    maxWidth: 700,
    marginHorizontal: "auto",
  },
  imageSliderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  upperContainer: {
    flex: 0.4,
    flexDirection: "column",
    marginRight: 12,
    justifyContent: "center",
    width: 400,
  },
  lowerContainer: {
    flex: 0.6,
    margin: 8,
    width: 400,
    paddingLeft: 20,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  name: {
    fontSize: 28,
    fontWeight: "500",
  },
});

export default ProductDetailsScreen;