import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import ProductCard from "../components/ProductCard";
import Data from "../Data";

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

function ProductScreen(props) {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(Data);
  const [oldData, setOldData] = useState(Data);
  const renderItem = ({ item }) => <ProductCard data={item} />;

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    if (formattedQuery === "") {
      setData(oldData);
    } else {
      let Data = oldData.filter((item) => {
        return contains(item.name.toLowerCase(), formattedQuery);
      });
      setData(Data);
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
      {/* Header  */}

      <View style={styles.header}>
        <View style={styles.search}>
          <AntDesign name="search1" size={20} />
          <TextInput
            placeholder="Search"
            onChangeText={handleSearch}
            style={{ paddingLeft: 10, outline: "none", flex: 1 }}
          />
        </View>

        {/* Filter Part Start */}

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setVisible(true);
          }}
        >
          <MaterialCommunityIcons name="sort-variant" size={25} />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setVisible(!visible);
          }}
        >
          <View style={styles.model}>
            <TouchableOpacity
              style={styles.modelClose}
              onPress={() => {
                setVisible(!visible);
              }}
            >
              <MaterialCommunityIcons name="close" size={25} color="white" />
            </TouchableOpacity>
            <View style={styles.modelContent}>
              <TouchableOpacity
                style={styles.sortName}
                onPress={() => {
                  setData(Data.sort((a, b) => b.price - a.price));
                  setVisible(!visible);
                }}
              >
                <Text>Price: High to Low</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sortName}
                onPress={() => {
                  setData(Data.sort((a, b) => a.price - b.price));
                  setVisible(!visible);
                }}
              >
                <Text>Price: Low to High</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sortName}
                onPress={() => {
                  setData(Data.sort((a, b) => a.name.localeCompare(b.name)));
                  setVisible(!visible);
                }}
              >
                <Text>Name</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sortName}
                onPress={() => {
                  setData(Data.sort((a, b) => a.avilable_qty - b.avilable_qty));
                  setVisible(!visible);
                }}
              >
                <Text>Avilable Qty.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Filter Part End */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} disableScrollViewPanResponder={true}>
        <TouchableOpacity style={styles.addProductButton}>
          <Text style={{ fontSize: 20, color: "white" }}>Add New Product</Text>
        </TouchableOpacity>

        {data && (
          <FlatList
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={col}
          />
        )}
        {data.length == 0 && (
          <Image
            style={styles.noData}
            source={require("../images/no-search-item-found.gif")}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
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
  dropdown: {
    justifyContent: "center",
  },
  model: {
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "white",
    height: 220,
    width: 200,
    shadowColor: "#000",
    shadowOpacity: 0.53,
    shadowRadius: 2.62,
    marginRight: 20,
  },
  modelClose: {
    backgroundColor: "#4d90fe",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.53,
    shadowRadius: 2.62,
    marginBottom: 16,
    marginTop: 5,
  },
  modelContent: {
    flex: 1,
    width: "90%",
    marginBottom: 10,
  },
  addProductButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#4d90fe",
    width: "50%",
    padding: 10,
    borderRadius: 5,
    marginVertical:7,
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
});

export default ProductScreen;