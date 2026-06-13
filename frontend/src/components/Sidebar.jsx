import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#1976d2",
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/categories">
            <ListItemText primary="Categories" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/brands">
            <ListItemText primary="Brands" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/suppliers">
            <ListItemText primary="Suppliers" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/products">
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/low-stock">
            <ListItemText primary="Low Stock" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/stock-history">
            <ListItemText primary="Stock History" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/stock-in">
            <ListItemText primary="Stock In" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/stock-out">
            <ListItemText primary="Stock Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;