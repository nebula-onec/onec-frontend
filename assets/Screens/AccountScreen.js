import React, { useState, useContext } from "react";
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
import ImageInput from "../components/ImageInput";

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
      <View>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
    )
  }
  const handlePress = () => {
    if(!imageUri) selectImage();
    else {
        if(Platform.OS=='web'){
            if(window.confirm("Are you sure you want to delete this image?")){
              onChangeImage(null);
            }
        }
        else{
            Alert.alert("Delete", "Are you sure you want to delete this image?",[{text:"Yes", onPress: () => onChangeImage(null)},{text:"No"}]);
        }
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
          <TouchableOpacity style={styles.imageContainer}>
            {!imageUri && (
              <MaterialCommunityIcons
                name="account"
                size={48}
              ></MaterialCommunityIcons>
            )}
            {imageUri && <ImageContainer/>}
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
    fontWeight: 400,
  },
  firstNameText: {
    fontSize: values.fontMid,
    fontWeight: 500,
  },
  imageContainer: {
    marginHorizontal: 12,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 40,
  },
  image: {
    height: 100,
    width: 100,
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
