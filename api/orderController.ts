import {serverUrl} from "../assets/config/url";
import { OrderCard } from "../types/order";
//this function returns either the array of objects or empty array
//how to set type for this function?
const getAllOrders = async () : Promise<OrderCard[]> => {
    try {
        const response = await fetch(serverUrl + "/api/admin/orders", {
            credentials: "include",
        })
        const json = await response.json();
        if(json.success)
            return json.orders;
        else
            console.log(json)
            throw new Error("Failed to fetch orders")
    }
    catch (error) {
        console.error(error);
        return []
    }
}

const getOrderById = async (id: string) : Promise<OrderCard | null> => {
    try {
        const response = await fetch(serverUrl + "/api/admin/orders/" + id, {
            credentials: "include",
        })
        const json = await response.json();
        if(json.success)
            return json.order;
        else
            console.log(json)
            throw new Error("Failed to fetch order" + json.message)
    }
    catch (error) {
        console.error(error);
        return null
    }
}

const changeOrderStatusApi = async (id: string, status: string) : Promise<any> => {
    try {
        const req = await fetch(serverUrl + "/api/admin/changeorderstatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                "order_id": id,
                "new_status": status
                })
            })
        const res = await req.json();
        return res;
    }
    catch (error) {
        console.error(error);
        return false;
    }  
}

export {getAllOrders, getOrderById, changeOrderStatusApi};