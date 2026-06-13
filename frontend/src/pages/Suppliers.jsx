import { useEffect, useState } from "react";

import {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier
} from "../services/supplierService";

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

function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);

  const [supplierName, setSupplierName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    const data = await getSuppliers();
    setSuppliers(data);
  };

  const handleEditClick = (supplier) => {

    setEditId(supplier.supplierid);

    setSupplierName(supplier.suppliername);
    setPhone(supplier.phone);
    setAddress(supplier.address);

    setOpen(true);
  };

  const handleSaveSupplier = async () => {

    if (editId) {

      await updateSupplier(editId, {
        supplierName,
        phone,
        address
      });

    } else {

      await addSupplier({
        supplierName,
        phone,
        address
      });
    }

    setSupplierName("");
    setPhone("");
    setAddress("");

    setEditId(null);
    setOpen(false);

    loadSuppliers();
  };

  const handleDeleteSupplier = async (id) => {

    if (window.confirm("Delete this supplier?")) {

      await deleteSupplier(id);

      loadSuppliers();
    }
  };

  const handleAddClick = () => {

    setEditId(null);

    setSupplierName("");
    setPhone("");
    setAddress("");

    setOpen(true);
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
        <Typography variant="h5">Suppliers</Typography>

        <Button variant="contained" onClick={handleAddClick}>
          Add Supplier
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Supplier"
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? "Edit Supplier" : "Add Supplier"}</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Supplier Name"
            margin="normal"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Phone"
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            fullWidth
            label="Address"
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleSaveSupplier}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {suppliers
              .filter((supplier) =>supplier.suppliername.toLowerCase().includes(search.toLowerCase()),
              ).map((supplier) => (
                <TableRow key={supplier.supplierid}>
                  <TableCell>{supplier.supplierid}</TableCell>

                  <TableCell>{supplier.suppliername}</TableCell>

                  <TableCell>{supplier.phone}</TableCell>

                  <TableCell>{supplier.address}</TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEditClick(supplier)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteSupplier(supplier.supplierid)}
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

export default Suppliers;