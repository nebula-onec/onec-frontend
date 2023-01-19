import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Values from "../config/Values";

const { height, width } = Dimensions.get("window");

let containerWidth;
if (width > 500) {
  containerWidth = width / 2;
}
// const popup = () => {
//   const [visible, setVisible] = useState(false);
//   return (
//     // Alert.alert('LogOut', 'Are you sure to logout?', [
//     //   {
//     //     text: 'Yes',
//     //     onPress: () => console.log('Logout'),
//     //   },
//     //   {
//     //     text: 'No',
//     //     onPress: () => console.log('cancle logout'),
//     //   }
//     // ])

//   );
// };

function AccountScreen(props) {
  const [userName, setUserName] = useState("Meet Patel");
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.outerContainer}>
      <View style={styles.profileDetailsContainer}>
        <TouchableOpacity style={styles.imageContainer}>
          <MaterialCommunityIcons
            name="account"
            size={80}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
        <View style={styles.detailesContainer}>
          <Text>{userName}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.logoutContainer}
        onPress={() => {
          setVisible(true);
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.logoutDescription}>
            <Text></Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: "column",
    width: containerWidth,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.53,
    shadowRadius: 2.62,
  },
  profileDetailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    height: 80,
  },
  imageContainer: {
    marginHorizontal: 24,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 40,
  },
  detailesContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoutContainer: {
    marginVertical: 24,
    backgroundColor: Values.primary,
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 16,
  },
});

export default AccountScreen;
