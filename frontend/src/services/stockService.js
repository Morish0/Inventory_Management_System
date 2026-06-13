import axios from "axios";

const API_URL = "http://localhost:5000/api/stock";

export const stockIn = async (data) => {
    const response = await axios.post(
        `${API_URL}/in`,
        data
    );

    return response.data;
};

export const stockOut = async (data) => {
    const response = await axios.post(
        `${API_URL}/out`,
        data
    );

    return response.data;
};

export const getStockHistory = async () => {
    const response = await axios.get(
        `${API_URL}/history`
    );

    return response.data;
};