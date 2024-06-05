export interface ProductInOrderDetails {
    id: string;
    price: string;
    product_image_url: string;
    product_name: string;
    quantity: number;
    total_for_this_product: string;
}
export interface ProductCard {
    category_id: string;
    category_name: string;
    description_long: string;
    description_short: string;
    images: string[];
    price: number;
    product_id: string;
    product_name: string;
    stock: number;
}