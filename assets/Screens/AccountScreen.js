import React, { useState, useContext,useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
} from "react-native";

import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import values from "../config/values";

import { tokenContext } from "../files/myContext";

const { height, width } = Dimensions.get("window");

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
  const [userName, setUserName] = useState({
    firstName: "Mit",
    lastName: "Patel",
  });
  const [imageUri, setImageUri] = useState(null);

  const { logout } = useContext(tokenContext);
  useEffect(()=>{requestPermission();},[])

  const requestPermission = async () => {
      const {granted} = await ImagePicker.requestCameraPermissionsAsync();
      if(!granted) alert("You need to enable permission to access your image library");
  }

  const ProfileImage = () => {
    return (
      <View style={styles.image}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
    )
  }
  const selectImage = async () => {
    try {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
          });
        setImageUri(result.assets[0].uri);
    } catch (error) {
        console.log(error);
    }
}

  return (
    <View style={styles.outerContainer}>
      <View style={styles.profileDetailsContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.userNameContainer}>
            <Text style={styles.welcomeText}>Hello.. </Text>
            <Text style={styles.firstNameText}>{userName.firstName}</Text>
          </View>
          <TouchableOpacity style={styles.imageContainer} onPress={selectImage}>
            {!imageUri && (
              <MaterialCommunityIcons
                name="account"
                size={64}
              ></MaterialCommunityIcons>
            )}
            {imageUri && <ProfileImage/>}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: "column",
    width: "70%",
    // alignSelf: "center",
    marginHorizontal: "auto",
    justifyContent: "space-between",
  },
  profileDetailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    height: 80,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // marginHorizontal:12,
    // paddingLeft:12
  },
  welcomeText: {
    fontSize: values.fontMid,
    color: "#382f2f",
    fontWeight: 'bold',
  },
  firstNameText: {
    fontSize: values.fontMid,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginHorizontal: 12,
    // shadowOpacity: 0.2,
    shadowRadius: 4,
    height:68,
    width:68,
    borderRadius:34,
    justifyContent:"center",
    alignItems:"center"
  },
  image: {
    height: 64,
    width: 64,
    borderRadius:32,
  },
  userNameContainer: {
    // alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  logoutContainer: {
    marginVertical: 24,
    backgroundColor: values.primary,
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 16,
  },
});

export default AccountScreen;
