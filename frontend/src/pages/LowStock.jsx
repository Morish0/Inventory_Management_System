import { useEffect, useState } from "react";
import { getLowStockProducts } from "../services/productService";

import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

function LowStock() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getLowStockProducts();
    setProducts(data);
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{ mb: 2 }}
      >
        Low Stock Products
      </Typography>

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Current Qty</TableCell>
              <TableCell>Minimum Stock</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {products.map((product) => (
              <TableRow key={product.productid}>

                <TableCell>
                  {product.productcode}
                </TableCell>

                <TableCell>
                  {product.productname}
                </TableCell>

                <TableCell>
                  {product.quantity}
                </TableCell>

                <TableCell>
                  {product.minimumstock}
                </TableCell>

                <TableCell>
                  LOW STOCK
                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>
      </TableContainer>
    </>
  );
}

export default LowStock;