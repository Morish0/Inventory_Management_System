const pool = require("../config/db");

const stockIn = async (req, res) => {
    try {

        const {
            productId,
            quantity,
            remarks
        } = req.body;

        await pool.query(
            `INSERT INTO stock_transactions
            (
                productid,
                transactiontype,
                quantity,
                remarks
            )
            VALUES($1,'IN',$2,$3)`,
            [
                productId,
                quantity,
                remarks
            ]
        );

        await pool.query(
            `UPDATE products
             SET quantity = quantity + $1
             WHERE productid = $2`,
            [
                quantity,
                productId
            ]
        );

        res.json({
            message: "Stock Added Successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

const stockOut = async (req, res) => {
    try {

        const {
            productId,
            quantity,
            remarks
        } = req.body;

        const result = await pool.query(
            `SELECT quantity
             FROM products
             WHERE productid = $1`,
            [productId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        if (result.rows[0].quantity < quantity) {
            return res.status(400).json({
                message: "Insufficient Stock"
            });
        }

        await pool.query(
            `INSERT INTO stock_transactions
            (
                productid,
                transactiontype,
                quantity,
                remarks
            )
            VALUES($1,'OUT',$2,$3)`,
            [
                productId,
                quantity,
                remarks
            ]
        );

        await pool.query(
            `UPDATE products
             SET quantity = quantity - $1
             WHERE productid = $2`,
            [
                quantity,
                productId
            ]
        );

        res.json({
            message: "Stock Removed Successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


const getStockHistory = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                st.transactionid,
                p.productname,
                st.transactiontype,
                st.quantity,
                st.remarks,
                st.transactiondate
            FROM stock_transactions st
            INNER JOIN products p
                ON st.productid = p.productid
            ORDER BY st.transactiondate DESC
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
    stockIn,
    stockOut,
    getStockHistory

};