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

export const updateBranch = async (id, branchData) => {
    const token = await getAuthToken();
    try {
        const newBranchData = {
            id_business: branchData.id_business || branchData.id_business,
            name: branchData.name || branchData.branch_name,
            location: branchData.location || branchData.branch_location,
            phone: branchData.phone || branchData.branch_phone,
            email: branchData.email || branchData.branch_email,
            state_branch: branchData.state_Branch || branchData.state_branch
        };
        const res = await axios.put(`/branches/${id}`, newBranchData, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log("Error actualizando", error);
        throw error;
    }
};


export const deleteBranch = async (id) => {
    const token = await getAuthToken();
    try {
        const res = await axios.delete(`/branches/${id}`, 
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