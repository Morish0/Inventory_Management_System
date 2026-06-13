const express = require("express");
const router = express.Router();

const {
    getBrands,
    addBrand,
    updateBrand,
    deleteBrand
} = require("../controllers/brandController");

router.get("/", getBrands);
router.post("/", addBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

module.exports = router;