import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/productService";
import { getBrands } from "../services/brandService";
import { getCategories } from "../services/categoryService";

import {
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

function Products() {
  const [products, setProducts] = useState([]);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [open, setOpen] = useState(false);

  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [unit, setUnit] = useState("Piece");
  const [quantity, setQuantity] = useState("");
  const [minimumStock, setMinimumStock] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
    loadBrands();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const loadBrands = async () => {
    const data = await getBrands();
    setBrands(data);
  };

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleEditClick = (product) => {
    setEditId(product.productid);

    setProductCode(product.productcode);
    setProductName(product.productname);
    setProductDescription(product.productdescription);

    setBrandId(product.brandid);
    setCategoryId(product.categoryid);

    setUnit(product.unit);
    setQuantity(product.quantity);
    setMinimumStock(product.minimumstock);

    setOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);

      loadProducts();
    }
  };

  const handleSaveProduct = async () => {
    const product = {
      productCode,
      productName,
      productDescription,
      brandId,
      categoryId,
      unit,
      quantity,
      minimumStock,
    };

    if (editId) {
      await updateProduct(editId, product);
    } else {
      await addProduct(product);
    }

    setProductCode("");
    setProductName("");
    setProductDescription("");

    setBrandId("");
    setCategoryId("");

    setUnit("Piece");
    setQuantity("");
    setMinimumStock("");

    setEditId(null);

    setOpen(false);

    loadProducts();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5">Products</Typography>

        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Product
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Product"
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add Product</DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Product Code"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />

            <TextField
              select
              fullWidth
              margin="normal"
              label="Brand"
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
            >
              {brands.map((brand) => (
                <MenuItem key={brand.brandid} value={brand.brandid}>
                  {brand.brandname}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              margin="normal"
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.categoryid} value={category.categoryid}>
                  {category.categoryname}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              margin="normal"
              label="Unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <MenuItem value="Piece">Piece</MenuItem>
              <MenuItem value="Kg">Kg</MenuItem>
              <MenuItem value="Gram">Gram</MenuItem>
              <MenuItem value="Litre">Litre</MenuItem>
              <MenuItem value="Box">Box</MenuItem>
              <MenuItem value="Pack">Pack</MenuItem>
              <MenuItem value="Dozen">Dozen</MenuItem>
              <MenuItem value="Meter">Meter</MenuItem>
            </TextField>

            <TextField
              fullWidth
              margin="normal"
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <TextField
              fullWidth
              margin="normal"
              type="number"
              label="Minimum Stock"
              value={minimumStock}
              onChange={(e) => setMinimumStock(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>

            <Button variant="contained" onClick={handleSaveProduct}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products
              .filter((product) =>
                product.productname.toLowerCase().includes(search.toLowerCase()) ||
                product.productcode.toLowerCase().includes(search.toLowerCase()) ||
                product.brandname.toLowerCase().includes(search.toLowerCase())
              ).map((product) => (
                <TableRow key={product.productid}>
                  <TableCell>{product.productcode}</TableCell>

                  <TableCell>{product.productname}</TableCell>

                  <TableCell>{product.brandname}</TableCell>

                  <TableCell>{product.categoryname}</TableCell>

                  <TableCell>{product.unit}</TableCell>

                  <TableCell>{product.quantity}</TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteProduct(product.productid)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Products;
