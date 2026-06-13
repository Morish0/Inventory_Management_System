import axios from "axios";

const API_URL = "http://localhost:5000/api/brands";

export const getBrands = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addBrand = async (brand) => {
    const response = await axios.post(
        API_URL,
        brand
    );

    return response.data;
};

export const updateBrand = async (id, brand) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        brand
    );

    return response.data;
};

export const deleteBrand = async (id) => {
    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;
};