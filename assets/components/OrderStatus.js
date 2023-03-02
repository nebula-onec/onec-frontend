import React, { useState } from "react";
import { TouchableOpacity, StyleSheet,Text, Modal } from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

function OrderStatus(props) {
  const [status, setStatus] = useState("Marked Packed");
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={()=>setModalVisible(true)}>
        <Text>
            {status}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={24}/>
      </TouchableOpacity>
        <Modal visible={modalVisible}>
            <TouchableOpacity onPress={()=>{setStatus("Marked Packed"); setModalVisible(false)}}><Text>Marked Packed</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setStatus("Delivered"); setModalVisible(false)}}><Text>Delivered</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setStatus("Cancle"); setModalVisible(false)}}><Text>Cancle</Text></TouchableOpacity>
        </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    flexDirection:"row",
  },
});

export default OrderStatus;
