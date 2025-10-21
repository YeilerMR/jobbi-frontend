import { getAuthToken } from "../utils/Token";
import axios from "./axios";

export const getUsers = async (query) => {
    const token = await getAuthToken();

    try {
        const res = await axios.get(`/users/search?name=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}