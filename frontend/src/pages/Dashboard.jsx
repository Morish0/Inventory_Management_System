import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

import {
  Grid,
  Paper,
  Typography
} from "@mui/material";

function Dashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getDashboardStats();
    setStats(data);
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              Total Products
            </Typography>

            <Typography variant="h3">
              {stats.totalProducts}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              Total Categories
            </Typography>

            <Typography variant="h3">
              {stats.totalCategories}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              Total Brands
            </Typography>

            <Typography variant="h3">
              {stats.totalBrands}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              Total Suppliers
            </Typography>

            <Typography variant="h3">
              {stats.totalSuppliers}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              Low Stock Products
            </Typography>

            <Typography variant="h3">
              {stats.lowStockProducts}
            </Typography>
          </Paper>
        </Grid>

      </Grid>
    </>
  );
}

export default Dashboard;