import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
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
        style={[styles.smallImageContainer,{}]}
      >
        <Image source={item.images} style={styles.smallImage} />
      </TouchableOpacity>
    );
  };
  let upperContainerWidth= width<450 ? width : parseInt(width/2) ;
  let previewImageHeight= ((upperContainerWidth)*62)/100 - 28 ;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { flexDirection: `${width < 450 ? "column" : "row"}` },
      ]}
    >
      <View style={[styles.upperContainer,{width:upperContainerWidth}]}>
        <View style={[styles.imageSliderContainer,{flexDirection:`${width < 450 ? "column" : "row-reverse"}`}]}>
          <View style={[styles.imagePreview,{height:previewImageHeight}]}>
            {/* {console.log(parseInt(previewImageHeight))} */}
            <Image
              style={styles.image}
              source={productData.images[fullImageId].image}
            />
          </View>
          <ScrollView style={{...styles.imageListContainer,width : `${width < 450 ? (upperContainerWidth*20)/100 : "100%"}`}}>
            <FlatList
              data={productData.images}
              keyExtractor={(item) => item.imageId}
              renderItem={ListProductImages}
              horizontal={width<450 ? true : false}
            />
          </ScrollView>
        </View>
      </View>
      <View style={[styles.lowerContainer,{width:`${width<450 ? "100%" : "50%"}`}]}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{productData.name}</Text>
        </View>
        <View style={styles.descriptionAttributeContainer}>
          <Text style={{ fontSize: values.fontSmall }}>Price: </Text>
          <Text style={styles.attributeName}>₹ {productData.price}</Text>
        </View>
        <View style={styles.descriptionAttributeContainer}>
          <Text style={{ fontSize: values.fontSmall }}>Weight: </Text>
          <Text style={styles.attributeName}>{productData.weight}</Text>
        </View>
        <View style={styles.descriptionAttributeContainer}>
          <Text style={{ fontSize: values.fontSmall }}>
            Available Quantity:{" "}
          </Text>
          <Text style={styles.attributeName}>{productData.avilable_qty}</Text>
        </View>
        <View style={styles.descriptionAttributeContainer}>
          <Text style={{ fontSize: values.fontSmall }}>
            Country Of Origin:{" "}
          </Text>
          <Text style={styles.attributeName}>{productData.avilable_qty}</Text>
        </View>
        <View style={styles.descriptionAttributeContainer}>
          <Text style={{ fontSize: values.fontSmall }}>Description: </Text>
          <Text style={styles.attributeName}>{productData.avilable_qty}</Text>
        </View>
        <View style={styles.descriptionAttributeContainer}>
          <Text style={{ fontSize: values.fontSmall }}>: </Text>
          <Text style={styles.attributeName}>{productData.avilable_qty}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: "auto",
    paddingHorizontal:"auto",
    width:"100%",
    maxWidth:800,
  },
  upperContainer: {
    flexDirection: "column",
    marginRight: 12,
    justifyContent: "flex-start",
    maxWidth:320,
    maxHeight:320,
  },
  lowerContainer: {
    margin: 8,
    paddingLeft: 20,
  },
  imageSliderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop:8,
    width:"100%",
    maxHeight:320,
  },
  imageListContainer:{
    marginHorizontal:2,
  },
  imagePreview:{
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    width: "80%",
    maxHeight:320,
  },
  image: {
    resizeMode: 'cover',
    width: "100%",
    height: 'inherit',
    maxHeight:320,
    overflow:"visible",
  },
  smallImageContainer:{
    width:60,
    height:"100%",
    marginVertical:4,
    marginHorizontal:4,
    // borderWidth:1,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  smallImage:{ width: 58, height: 58},
  nameContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  name: {
    fontSize: 28,
    fontWeight: "500",
  },
  descriptionAttributeContainer:{ flexDirection: "row", alignItems: "center" },
  attributeName:{ fontSize: values.fontSmall },

});

export default ProductDetailsScreen;