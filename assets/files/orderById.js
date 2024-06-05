export const orderById = {
    orderID: 123456,
    orderDate: new Date(2023, 1, 31).toLocaleString(),
    customerName: "Raghav Dixit",
    phone: "512451278",
    address: {
        0 : "Makaan no. 9254",
        1: "2nd Floor, Do Wan Hung Bhawan",
        2: "Manit, Bhopal",
        pincode: "462003"
    },

    summary: {
        grand_total: "6969",
        shipping_cost: "40",
    },
    
    products: [
        {
            id: "123456",
            price: "23",
            quantity: 2,
            product_image_url: "",
            product_name: "Murga Brand",
            total_for_this_product: "46"
        },
        {
            id: "123456",
            price: "23",
            quantity: 2,
            product_image_url: "",
            product_name: "Murga Brand",
            total_for_this_product: "46"
        },
        {
            id: "123456",
            price: "23",
            quantity: 2,
            product_image_url: "",
            product_name: "Murga Brand",
            total_for_this_product: "46"
        },
        {
            id: "123457",
            price: "24",
            quantity: 1,
            product_image_url: "",
            product_name: "Kachua Chaap",
            total_for_this_product: "46"
        }
    ]
};