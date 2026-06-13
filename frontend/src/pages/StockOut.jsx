import { useEffect, useState } from "react";

import { getProducts } from "../services/productService";
import { stockOut } from "../services/stockService";

import {
    Paper,
    Typography,
    Button,
    MenuItem,
    TextField,
    Box
} from "@mui/material";

function StockOut() {

    const [products, setProducts] = useState([]);

    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [remarks, setRemarks] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const handleSave = async () => {

        await stockOut({
            productId,
            quantity,
            remarks
        });

        alert("Stock Removed Successfully");

        setProductId("");
        setQuantity("");
        setRemarks("");
    };

    return (
        <Paper sx={{ p: 3 }}>

            <Typography variant="h5" mb={2}>
                Stock Out
            </Typography>

            <TextField
                select
                fullWidth
                label="Product"
                margin="normal"
                value={productId}
                onChange={(e) =>
                    setProductId(e.target.value)
                }
            >
                {products.map((product) => (
                    <MenuItem
                        key={product.productid}
                        value={product.productid}
                    >
                        {product.productname}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                fullWidth
                label="Quantity"
                margin="normal"
                value={quantity}
                onChange={(e) =>
                    setQuantity(e.target.value)
                }
            />

            <TextField
                fullWidth
                label="Remarks"
                margin="normal"
                value={remarks}
                onChange={(e) =>
                    setRemarks(e.target.value)
                }
            />

            <Box mt={2}>
                <Button
                    variant="contained"
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Box>

        </Paper>
    );
}

export default StockOut;