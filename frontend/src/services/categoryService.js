import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";

export const getCategories = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addCategory = async (categoryName) => {
    const response = await axios.post(
        API_URL,
        {
            categoryName
        }
    );

    return response.data;
};

export const updateCategory = async (id, categoryName) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        { categoryName }
    );

    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;
};