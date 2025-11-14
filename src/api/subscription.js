import { getAuthToken } from "../utils/Token";
import axios from "./axios";


export const getAllPlans = async () =>{
    //const token = await getAuthToken();
    try {
        const res = await axios.get('/subscriptions/plans');
        return res.data;
    } catch (error) {
        throw error;
    }
}