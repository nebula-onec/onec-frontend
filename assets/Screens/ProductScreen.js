import React from "react";
import { View, FlatList, StyleSheet, Dimensions, Image } from "react-native";
import Constants from 'expo-constants';

import ProductCard from "../components/ProductCard";
import Data from "../Data";

const {width}=Dimensions.get("window");
let col=1;
if(width<=500){
    col=1;
}
else{
    col=width/250;
}

function ProductScreen(props) {
  const renderItem = ({ item }) => <ProductCard data={item} />;

  return (
    <View style={styles.container}>
        <Image source={require("../images/icon_150.png")}></Image>
      <FlatList
        data={Data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // horizontal={false}
        numColumns={col}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProductScreen;
