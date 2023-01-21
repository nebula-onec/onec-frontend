import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { AntDesign, Ionicons, Feather, Entypo } from "@expo/vector-icons";
import Values from "../config/Values";

import data from "../files/data";

const { width } = Dimensions.get("window");
let col = 1;
if (width <= 500) {
  col = 1;
} else {
  col = parseInt(width / 250);
  if (col > 4) {
    col = 4;
  }
}

function CurrentOrder({ data }) {
  const getcolor = () => {
    let n = Math.random();
    let col; //for color
    if (n < 0.25 /*data.status === 'ordered' */) col = "#424141";
    else if (n < 0.5 /*data.status === 'processing'*/) col = "#faa30c";
    else if (n < 0.75 /*data.status === 'cancelled'*/) col = "#fa0702";
    else col = "#029613";
    return col;
  };
  return (
    <View style={styles.current_order}>
      <View style={styles.current_order_v1}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          order: {data.orderID}
        </Text>
      </View>
      <View style={styles.current_order_v1}>
        <View>
          <View style={styles.order_v2}>
            <Ionicons name="person" size={22} color="black" />
            <Text> {data.name}</Text>
          </View>
          <View style={styles.order_v2}>
            <Entypo name="phone" size={22} color="black" />
            <Text> {data.phone}</Text>
          </View>
          <View style={styles.order_v2}>
            <Entypo name="clock" size={22} color="black" />
            <Text style={{marginLeft:5}}>Order-time: {data.time}</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              ...styles.current_order_status,
              backgroundColor: getcolor(),
            }}
          >
            status{data.status}
          </Text>
        </View>
      </View>
      <View style={styles.current_order_v1}>
        <Text style={styles.order_v3_text}>More Details </Text>
        <AntDesign name="arrowright" size={22} color="black" />
      </View>
    </View>
  );
}

function OrderScreen(props) {
  const [orderData, setOrderData] = useState(data);
  const [oldOrderData, setOldOrderData] = useState(data);
  const renderItem = ({ item }) => <CurrentOrder data={item} />;

  const handleSearch = (orderNo) => {
    const formattedQuery = orderNo;
    if (formattedQuery === "") {
      setOrderData(oldOrderData);
    } else {
      let Data = oldOrderData.filter((item) => {
        return item.orderID==formattedQuery;
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
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          data={orderData}
          keyExtractor={(item) => item.orderID}
          renderItem={renderItem}
          numColumns={col}
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
    backgroundColor: Values.white,
    margin: 8,
    shadowColor: Values.black,
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
    marginHorizontal: 16,
  },
  current_order_v1: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomColor: "#e4e4e4",
    borderBottomWidth: 1,
  },
  order_v2: {
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
  current_order_status: {
    shadowColor: Values.black,
    borderRadius: 2,
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 2,
    backgroundColor: Values.white,
    fontSize: 16,
    padding: 2,
    color: Values.white,
  },
  current_order_processed: {
    color: Values.white,
  },
});

export default OrderScreen;
