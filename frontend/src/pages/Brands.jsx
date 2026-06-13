import { useEffect, useState } from "react";

import {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand
} from "../services/brandService";

import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";

function Brands() {

  const [brands, setBrands] = useState([]);
  const [open, setOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    const data = await getBrands();
    setBrands(data);
  };

  const handleEditClick = (brand) => {
    setEditId(brand.brandid);
    setBrandName(brand.brandname);
    setOpen(true);
  };

  const handleSaveBrand = async () => {

    if (editId) {
      await updateBrand(editId, {
        brandName
      });
    }
    else {
      await addBrand({
        brandName
      });
    }

    setBrandName("");
    setEditId(null);
    setOpen(false);

    loadBrands();
  };

  const handleDeleteBrand = async (id) => {

    if (window.confirm("Delete this brand?")) {

      await deleteBrand(id);

      loadBrands();
    }
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
        <Typography variant="h5">Brands</Typography>

        <Button
          variant="contained"
          onClick={() => {
            setEditId(null);
            setBrandName("");
            setOpen(true);
          }}
        >
          Add Brand
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Brand"
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? "Edit Brand" : "Add Brand"}</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Brand Name"
            margin="normal"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleSaveBrand}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Brand Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {brands
              .filter((brand) =>brand.brandname.toLowerCase().includes(search.toLowerCase()),
              ).map((brand) => (
                <TableRow key={brand.brandid}>
                  <TableCell>{brand.brandid}</TableCell>

                  <TableCell>{brand.brandname}</TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEditClick(brand)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteBrand(brand.brandid)}
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

export default Brands;