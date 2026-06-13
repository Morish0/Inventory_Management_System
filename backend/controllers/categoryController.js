const pool = require("../config/db");

const getCategories = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM categories ORDER BY categoryid"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        const result = await pool.query(
            "INSERT INTO categories(categoryname) VALUES($1) RETURNING *",
            [categoryName]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;

        const result = await pool.query(
            `UPDATE categories
             SET categoryname = $1
             WHERE categoryid = $2
             RETURNING *`,
            [categoryName, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM categories WHERE categoryid = $1",
            [id]
        );

        res.json({
            message: "Category Deleted Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
};