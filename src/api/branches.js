import { getAuthToken } from "../utils/Token";
import axios from "./axios";

export const getMyBranches = async () => {
    const token = await getAuthToken();
    
    try {
        const res = await axios.get(`/branches`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}