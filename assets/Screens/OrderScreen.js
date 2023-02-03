import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons, Feather, Entypo } from "@expo/vector-icons";
import Values from "../config/values";
import OrderCard from "../components/OrderCard";

import data from "../files/data";

function OrderScreen({navigation}) {
  const [orderData, setOrderData] = useState(data);
  const [oldOrderData, setOldOrderData] = useState(data);
  const renderItem = ({ item }) => <OrderCard {...item}/>;

  const handleSearch = (orderNo) => {
    let formattedQuery = orderNo.toString();
    if (formattedQuery === "") {
      setOrderData(oldOrderData);
    } else {
      let Data = oldOrderData.filter((item) => {
        return contains(item.orderID.toString(), formattedQuery);
      });
      setOrderData(Data);
    }
  };
  const contains = (name, query) => {
    if (name.includes(query)) {
      return true;
    }
    return false;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.search}>
          <AntDesign name="search1" size={20} />
          <TextInput
            placeholder="Search"
            onChangeText={handleSearch}
            style={{ paddingLeft: 10, outline: "none", flex: 1 }}
          />
        </View>
      </View>
      {orderData && (
        <FlatList
          data={orderData}
          keyExtractor={(item) => item.orderID}
          renderItem={renderItem}
        />
      )}
      {orderData.length == 0 && (
        <Image
          style={styles.noData}
          source={require("../images/no-search-item-found.gif")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.53,
    shadowRadius: 2.62,
  },
  search: {
    flex: 0.95,
    height: 40,
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    paddingLeft: 20,
    paddingBottom: 10,
    alignItems: "center",
  },
  sortName: {
    flex: 1,
    marginVertical: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.53,
    shadowRadius: 2.62,
  },
  noData: {
    height: 250,
    width: 250,
    alignSelf: "center",
  },
  current_order: {
    flex: 1,
    backgroundColor: Values.white,
    margin: 8,
    shadowColor: Values.black,
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
    marginHorizontal: 16,
  },
  orderCardHeader: {
    flexDirection: "column",
    padding: 12,
    paddingHorizontal: 24,
    borderBottomColor: "#e4e4e4",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  moreDetailsContainer: {
    flexDirection: "row",
  },
  orderInfoContainer: {
    flex: 1,
    flexDirection: "row",
    padding:8,
    justifyContent:"space-evenly"
  },
  orderDetails: {
    flexDirection: "row",
    paddingLeft: 8,
    marginVertical: 4,
  },
  order_v3_text: {
    textAlign: "right",
    alignItems: "flex-end",
    marginLeft: "auto",
    color: Values.primary,
    fontWeight: "bold",
  },
});

export default OrderScreen;
