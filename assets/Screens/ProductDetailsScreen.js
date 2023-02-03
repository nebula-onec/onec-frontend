import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  useWindowDimensions,
  Dimensions
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getData } from "../Data";
// const { width } = Dimensions.get("window");


// let upperDirection, pageDirection;
// if(width<350){
//   upperDirection="row";
//   pageDirection="column";
// }
// else{
//   pageDirection="row";
// }

// const {width} = useWindowDimensions();

function ProductDetailsScreen({ route, navigation }) {
  // const { itemId } = route.params;
  const {width} = useWindowDimensions();
  // const productData = getData(itemId);
  const productData = getData(1);

  return (
    <View style={[styles.container,{flexDirection: `${width<350 ?"column" : "row"}`}]}>
      <View style={styles.upperContainer}>
        <View style={styles.imageSliderContainer}>
          <Image  style= {styles.image } source={productData.image[0].image}/>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{productData.name}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Price: ₹ {productData.price}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{productData.name}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{productData.name}</Text>
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
    // flexDirection: `${width<350 ?"column" : "row"}`,
    justifyContent: "center",
    backgroundColor:"white",
    flexWrap:"wrap"
  },
  imageSliderContainer: {
    width: 300,
    height: 200,
  },
  image:{
    width:150,
    height:150,
  },
  upperContainer: {
    flexDirection: "column",
    // backgroundColor:"black",
    marginRight:12,
    justifyContent:"center",
  },
  lowerContainer: {
    marginVertical:8,
    // justifyContent:"center"
  },
  name: {
    fontSize:28,
    fontWeight:"500",

  },
});

export default ProductDetailsScreen;
