const pool = require("../config/db");

const getSuppliers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM suppliers ORDER BY supplierid"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const addSupplier = async (req, res) => {
    try {
        const { supplierName, phone, address } = req.body;

        const result = await pool.query(
            `INSERT INTO suppliers
            (suppliername, phone, address)
            VALUES ($1,$2,$3)
            RETURNING *`,
            [supplierName, phone, address]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { supplierName, phone, address } = req.body;

        const result = await pool.query(
            `UPDATE suppliers
             SET suppliername = $1,
                 phone = $2,
                 address = $3
             WHERE supplierid = $4
             RETURNING *`,
            [supplierName, phone, address, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM suppliers WHERE supplierid = $1",
            [id]
        );

        res.json({
            message: "Supplier Deleted Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier
};