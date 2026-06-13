const pool = require("../config/db");

const getBrands = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM brands ORDER BY brandid"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const addBrand = async (req, res) => {
    try {
        const { brandName } = req.body;

        const result = await pool.query(
            "INSERT INTO brands(brandname) VALUES($1) RETURNING *",
            [brandName]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { brandName } = req.body;

        const result = await pool.query(
            `UPDATE brands
             SET brandname = $1
             WHERE brandid = $2
             RETURNING *`,
            [brandName, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM brands WHERE brandid = $1",
            [id]
        );

        res.json({
            message: "Brand Deleted Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getBrands,
    addBrand,
    updateBrand,
    deleteBrand
};