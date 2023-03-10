import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Ionicons, Feather,  Entypo , EvilIcons} from '@expo/vector-icons';

import values from '../config/values';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function OrderCard(props){
    const [cardData, setCardData] = useState(props);
    const navigation = useNavigation();
    const getcolor = () => {
        let n = parseInt(cardData.status)
        let col; //for color
        if( n == 1 ) col = 'black' 
        else if( n == 2) col = 'black' // to pack order
        else if( n == 3) col = '#029613' // to deliver
        else col = values.red // delivered
        return col
    }
    const actionMessage = () => {
        let status, actionButton;
        if(cardData.status == 0) actionButton = "Cancelled"
        else if(cardData.status == 1) {
            status = "status: Created"
            actionButton = "Mark Packed"
        }
        else if(cardData.status == 2){
            status = "status: Packed"
            actionButton = "Mark Delivered"
        }
        else actionButton = "Delivered"
        return [status, actionButton]
    }
    const handleAction = ()=> {
        
    }
    const styles = StyleSheet.create({
        current_order: {
            backgroundColor: values.white,
            marginHorizontal: 8,
            marginVertical: 12,
            shadowColor: values.black,
            shadowOpacity: 0.35,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 6,
            marginHorizontal: 16
        },
        current_order_v1: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 12,
            borderBottomColor: '#e4e4e4',
            borderBottomWidth: 1,
        },
        order_v2: {
            flexDirection: 'row',
            paddingLeft: 8,
            marginVertical: 4,
        },
        order_v3_text: {
            textAlign: 'right',
            alignItems: 'flex-end',
            color: values.primary,
            fontWeight: 'bold',
        },
        current_order_status: {
            borderRadius: 2,
            backgroundColor: values.white,
            fontSize: 16,
            padding: 2,
        },
        current_order_processed : {
            color: values.white,
        },
        actionButton: {
            textAlign: 'center',
            fontSize: values.fontSmall,
            marginRight: 'auto',
            color: getcolor(),
        },
        actionButtonContainer: {
            flexDirection: 'row',
            backgroundColor: `${cardData.status == 1 || props.status == 2 ? '#c1d9ff' : 'white'}`,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 12,
        }
    });
    
    return (
        <View style={styles.current_order}>
            <View style={styles.current_order_v1}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>Order: {cardData.orderID}</Text><Text>Order-time: {cardData.time}</Text>
            </View>
            <View style={styles.current_order_v1}>
                <View>
                    <View  style={styles.order_v2}>
                        <Ionicons name="person" size={22} color="black" />
                        <Text>   {cardData.name}</Text>
                    </View>
                    <View style={styles.order_v2}>
                        <Entypo name="phone" size={22} color="black" />
                        <Text>   {cardData.phone}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{...styles.current_order_status}}>{actionMessage()[0]}</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.current_order_v1} onPress={ () => navigation.navigate("Order Details", {orderID:cardData.orderID}) }>
                    <TouchableOpacity onPress={handleAction} style={styles.actionButtonContainer}>
                        {(cardData.status == 2 || cardData.status == 1) && <AntDesign name="checkcircleo" size={24} color="black" style={{paddingRight: 4}}/>}
                        <Text style={{...styles.actionButton}}>{actionMessage()[1]}</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.order_v3_text} >More Details </Text>
                        <AntDesign name="arrowright" size={22} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}