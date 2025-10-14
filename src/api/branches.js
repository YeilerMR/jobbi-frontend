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

export const getBranchesByBusiness = async (id) => {
    const token = await getAuthToken();
    try {
        const res = await axios.get(`/branches?businessId=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        throw error;
    }

};

export const createBranch = async (businessId,branchData) => {
    const token = await getAuthToken();
    try {
        const dataToSend = { ...branchData, id_business: businessId };
        const res = await axios.post(`/branches`, dataToSend, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateBranch = async (id, branchData) => { };