const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
    try {

        const products = await pool.query(
            "SELECT COUNT(*) FROM products"
        );

        const categories = await pool.query(
            "SELECT COUNT(*) FROM categories"
        );

        const brands = await pool.query(
            "SELECT COUNT(*) FROM brands"
        );

        const suppliers = await pool.query(
            "SELECT COUNT(*) FROM suppliers"
        );

        const lowStock = await pool.query(`
            SELECT COUNT(*)
            FROM products
            WHERE quantity <= minimumstock
        `);

        res.json({
            totalProducts: products.rows[0].count,
            totalCategories: categories.rows[0].count,
            totalBrands: brands.rows[0].count,
            totalSuppliers: suppliers.rows[0].count,
            lowStockProducts: lowStock.rows[0].count
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    getDashboardStats
};