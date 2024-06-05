import { OrderCard } from "./order";

export interface HomeScreenData {
    // format of homeData
    //  {
    //     orders: 0,
    //     n_customers: 0,
    //     n_products: 0,
    //     unavailable_products: 0,
    //     n_sold: 0,
    //     unfulfilled_orders: [
    //         {
    //             order_id: 0,
    //             order_date: "2023-02-14T06:03:40.000Z",
    //             order_status: 1,
    //             user_id: 0,
    //             name: "Sample Name"
    //         }
    //     ]
    // }
    orders: number;
    n_customers: number;
    n_products: number;
    unavailable_products: number;
    n_sold: number;
    unfulfilled_orders: OrderCard[];
}