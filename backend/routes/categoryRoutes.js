const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM Categories ORDER BY CategoryID"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { categoryName } = req.body;

        const result = await pool.query(
            "INSERT INTO Categories(CategoryName) VALUES($1) RETURNING *",
            [categoryName]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;

        const result = await pool.query(
            "UPDATE categories SET categoryname = $1 WHERE categoryid = $2 RETURNING *",
            [categoryName, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.delete("/:id", async (req, res) => {
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
        res.status(500).json({
            message: "Server Error"
        });
    }
});
module.exports = router;

