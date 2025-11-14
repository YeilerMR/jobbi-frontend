import { getAuthToken } from "../utils/Token";
import axios from "./axios";

export const getSlots = async (idEmployee, date) => {
    const token = await getAuthToken();
    try {
        const res = await axios.get(`/calendar/${idEmployee}/availability/${date}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};