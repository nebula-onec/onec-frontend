import { serverUrl } from "../assets/config/url";
import { ProductCard } from "../types/product";

type ProductCardContainer = {
    success: boolean;
    products: ProductCard[];
}

const getAllProductsApi = async (): Promise<ProductCardContainer> => {
    try{
        const response = await fetch(serverUrl + "/api/admin/products", {
            credentials: "include",
        });
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error(error);
        return { success: false, products: [] };
    }
}
export { getAllProductsApi };