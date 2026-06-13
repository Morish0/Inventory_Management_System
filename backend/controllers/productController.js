const pool = require("../config/db");

const getProducts = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
    p.productid,
    p.productcode,
    p.productname,
    p.productdescription,
    p.brandid,
    p.categoryid,
    b.brandname,
    c.categoryname,
    p.unit,
    p.quantity,
    p.minimumstock,
    p.createddate
            FROM products p
            JOIN brands b ON p.brandid = b.brandid
            JOIN categories c ON p.categoryid = c.categoryid
            ORDER BY p.productid
        `);

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const addProduct = async (req, res) => {
    try {
        const {
            productCode,
            productName,
            productDescription,
            brandId,
            categoryId,
            unit,
            quantity,
            minimumStock
        } = req.body;

        const result = await pool.query(
            `INSERT INTO products
            (
                productcode,
                productname,
                productdescription,
                brandid,
                categoryid,
                unit,
                quantity,
                minimumstock
            )
            VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *`,
            [
                productCode,
                productName,
                productDescription,
                brandId,
                categoryId,
                unit,
                quantity,
                minimumStock
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM products WHERE productid = $1",
            [id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            productCode,
            productName,
            productDescription,
            brandId,
            categoryId,
            unit,
            quantity,
            minimumStock
        } = req.body;

        const result = await pool.query(
            `UPDATE products
             SET productcode = $1,
                 productname = $2,
                 productdescription = $3,
                 brandid = $4,
                 categoryid = $5,
                 unit = $6,
                 quantity = $7,
                 minimumstock = $8
             WHERE productid = $9
             RETURNING *`,
            [
                productCode,
                productName,
                productDescription,
                brandId,
                categoryId,
                unit,
                quantity,
                minimumStock,
                id
            ]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM products WHERE productid = $1",
            [id]
        );

        res.json({
            message: "Product Deleted Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getLowStockProducts = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                productid,
                productcode,
                productname,
                quantity,
                minimumstock
            FROM products
            WHERE quantity <= minimumstock
            ORDER BY quantity
        `);

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts
};