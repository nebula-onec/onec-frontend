import React from "react";
import {  View,  StyleSheet,  TouchableOpacity,  Text,  Image,  Dimensions,  useWindowDimensions} from "react-native";

function ProductCard({ data, navigation, root }) {
  const { width } = useWindowDimensions();
  let col=1,container_width,flexDirection,extraDetailsContainerDirection,alignName,imageWidth,imageHeight;
  if (width <= 500) {
    col = 1;
    flexDirection = "row";
    container_width = width - 20;
    extraDetailsContainerDirection="column";
    alignName = "flex-start";
    imageWidth = 75;
    imageHeight = 50;
  } else {
    col = parseInt(width / 250);
    if (col > 4) {
      col = 4;
    }
    flexDirection = "column";
    container_width = parseInt(width / col) - 20;
    extraDetailsContainerDirection="row";
    alignName = "center";
    imageWidth = 150;
    imageHeight = 100;
  }
  let { images, product_name, category_id, price, stock, product_id } = data;
  let image=images.split(';').shift();
  let image_url = `https://res.cloudinary.com/dqzedyrjd/image/upload/${image}.jpg`;
  if(!image_url) image_url = "https://fastly.picsum.photos/id/2/536/354.jpg?hmac=EVqChBVjwdZVaEJoMQgFSzZhsD72o5119rYcaw33YBo"
  return (
    <TouchableOpacity
      style={[styles.container,{width: container_width,flexDirection:flexDirection}]}
      onPress={() => navigation.navigate("ProductDetails", { itemId: product_id })}
    >
      <View style={styles.cardImage}>
        <Image style={[styles.image,{width:imageWidth, height:imageHeight}]} source={image_url} resizeMode="cover" />
      </View>
      <View style={styles.productDetails}>
        <View style={[styles.nameCntainer,{alignSelf: alignName}]}>
          <Text style={styles.cardName}>{product_name}</Text>
        </View>
        <View style={[styles.extraDetailsContainer,{flexDirection:extraDetailsContainerDirection}]}>
          <View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>Price : </Text>
              <Text>₹{price}</Text>
            </View>
            <View style={styles.weightContainer}>
              <Text tyle={{ color: "green" }}>{category_id}</Text>
            </View>
          </View>
          <View style={styles.avilableQtyContainer}>
            <Text style={styles.quantity}>Available Qty: </Text>
            <Text>{stock}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "white",
    margin: 12,
    marginHorizontal: 5,
    alignItems: "center",
    padding: 8,
    
  },
  cardImage: {
    margin: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 30,
    paddingBottom: 30,
  },
  image: {
    alignSelf: "center",
  },
  productDetails: {
    flex: 1,
    width: "100%",
    flexWrap:"wrap"
  },
  nameCntainer: {
    margin: 5,
  },
  cardName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#878787",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  extraDetailsContainer: {
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
