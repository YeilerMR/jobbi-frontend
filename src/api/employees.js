import { getAuthToken } from "../utils/Token";
import axios from "./axios";

export const createEmployee = async (idBranch, employeeData) => {
    const token = await getAuthToken();
    try {
        const dataToSend = { ...employeeData, id_branch: idBranch };
        const res = await axios.post(`/employees`, dataToSend, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getEmployeesByBranch = async (id) => {
    const token = await getAuthToken();
    try {
        const res = await axios.get(`/employees/branch/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getMyEmployees = async () => {
    const token = await getAuthToken();
    try {
        const res = await axios.get(`/employees`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const updateEmployee = async (id, employeeData) => { }

export const deleteEmployee = async (id) => {
    const token = await getAuthToken();
    try {
        const res = await axios.delete(`/employees/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}