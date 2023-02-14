import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
  Platform,
} from "react-native";
import { MaterialCommunityIcons,Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

import values from "../config/values";

function ImageInput({ imageUri,onChangeImage }) {

  const ImageContainer = () => {
    return (
      <View>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <Ionicons name="close-circle-sharp" size={32} color="black" style={styles.closeButton} />
      </View>
    )
  }

    useEffect(()=>{requestPermission();},[])

    const requestPermission = async () => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync();
        if(!granted) alert("You need to enable permission to access your image library");
    }

    const selectImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                // allowsEditing: true,
                // aspect: [4, 3],
                quality: 1,
              });
            if(!imageUri) {
                onChangeImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log(error);
        }
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
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && <MaterialCommunityIcons size={24} name="camera"/>}
        {imageUri && <ImageContainer />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: values.primary_background,
    alignItems: "center",
    borderRadius: 15,
    height: 100,
    width:100,
    justifyContent: "center",
    overflow: "hidden",
    alignContent:"center",
    cursor: 'pointer'
  },
  image: {
    height: 100,
    width: 100,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    textShadowColor: 'white',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 15
  }
});

export default ImageInput;
