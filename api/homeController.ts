import { serverUrl } from "../assets/config/url";
import { HomeScreenData } from "../types/home";
export const getHomeScreenData = async () : Promise<HomeScreenData | null> => {
    try {
        const response = await fetch(serverUrl + "/api/admin/home", {
            credentials: "include",
        });
        const json = await response.json();
        return json.info;
    } catch (error) {
        console.error(error);
        return null;
    }
};