const express = require("express");

const router = express.Router();

const {
    stockIn,
    stockOut,
    getStockHistory
} = require("../controllers/stockController");

router.post("/in", stockIn);
router.post("/out", stockOut);
router.get("/history", getStockHistory);

module.exports = router;