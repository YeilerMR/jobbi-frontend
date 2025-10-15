import { getAuthToken } from "../utils/Token";
import axios from "./axios";

export const createEmployee = async (idBranch, employeeData) => {
    const token = await getAuthToken();
}

export const getEmployeesByBranch = async (id) => {}

export const getMyEmployees = async () => {}

export const updateEmployee = async (id, employeeData) => {}

export const deleteEmployee = async (id) => {}