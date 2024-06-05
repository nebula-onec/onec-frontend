import React, { useEffect, useState } from "react";
import {  View,  FlatList,  StyleSheet, Dimensions,  TextInput,  TouchableOpacity,  Modal,  Text,  Image, RefreshControl} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {serverUrl, url} from "../config/url";

import ProductCard from "../components/ProductCard";
import {getDatas} from "../Data";
import { getAllProductsApi } from "../../api/productController";

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

function ProductScreen({navigation, route}) {
  const Data=getDatas();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(Data);
  const [productsData, setProductsData] = useState([
    // {
    //   product_id: 1,
    //   product_name: "Sample Product Name",
    //   price: 14500,
    //   category_id: null,
    //   description_short: "This is ample description",
    //   stock: 100,
    //   images: ''
    // }
  ])
  const [oldData, setOldData] = useState(Data);
  const renderItem = ({ item }) => <ProductCard data={item} navigation={navigation}/>;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
      setRefreshing(false);
      }, 2000);
  }, []);

  useEffect(() => {
    if(refreshing == true) return;
    getAllProductsApi()
    .then(res => {
        if(res.success){
          setProductsData(res.products)
          console.log(res)
        }
        else {
          console.log('error in Product Screen request')
        }
    }, [])
    .catch(e => {
        console.error(e)
    })
  }, [refreshing])

  const list_header = () => {
    return (
      <View style={styles.addProductButtonContainer}>
        <TouchableOpacity style={styles.addProductButton} onPress={() => navigation.navigate("Add Product")}>
          <Text style={{ fontSize: 20, color: "white" }}>Add New Product</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
          activeOpacity={1}
        >
          <Text style={{ paddingRight: 4 }}>Sort By</Text>
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

      {data && (
        <FlatList
          ListHeaderComponent={list_header}
          ListHeaderComponentStyle={styles.addProductButtonContainer}
          refreshControl= {
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          data={productsData}
          keyExtractor={(item) => item.product_id}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:3,
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
    paddingLeft: 28,
    paddingBottom: 10,
    alignItems: "center",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 18,
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
    marginTop: 12,
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
  addProductButtonContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    color: "#fc6103",
    width: "100%",
    paddingHorizontal: 16,
  },
  addProductButton: {
    backgroundColor: "#4d90fe",
    padding: 10,
    borderRadius: 10,
    marginVertical: 7,
    width: `${col == 1 ? "100%" : "200px"}`,
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 24,
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
