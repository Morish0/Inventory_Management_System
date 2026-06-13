import { useEffect, useState } from "react";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../services/categoryService";

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

function Categories() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleAddCategory = async () => {
    await addCategory(categoryName);

    setCategoryName("");
    setOpen(false);

    loadCategories();
  };

  const handleEditClick = (category) => {
    setEditId(category.categoryid);
    setCategoryName(category.categoryname);
    setOpen(true);
  };

  const handleSaveCategory = async () => {
    if (editId) {
      await updateCategory(editId, categoryName);
    } else {
      await addCategory(categoryName);
    }

    setCategoryName("");
    setEditId(null);
    setOpen(false);

    loadCategories();
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Delete this category?")) {
      await deleteCategory(id);
      loadCategories();
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
        <Typography variant="h5">Categories</Typography>

        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Category
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search Category"
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>{editId ? "Edit Category" : "Add Category"}</DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              label="Category Name"
              margin="normal"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>

            <Button variant="contained" onClick={handleSaveCategory}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories
              .filter((category) =>category.categoryname.toLowerCase().includes(search.toLowerCase()),
              ).map((category) => (
                <TableRow key={category.categoryid}>
                  <TableCell>{category.categoryid}</TableCell>

                  <TableCell>{category.categoryname}</TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEditClick(category)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteCategory(category.categoryid)}
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

export default Categories;