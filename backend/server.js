const express = require("express");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const app = express();
const brandRoutes = require("./routes/brandRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stockRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/brands", brandRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.post("/test", (req, res) => {
    res.json({ message: "POST Working" });
});

app.use("/api/categories", categoryRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});