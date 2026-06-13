import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Suppliers from "./pages/Suppliers";
import Products from "./pages/Products";
import StockHistory from "./pages/StockHistory";
import LowStock from "./pages/LowStock";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box sx={{ flexGrow: 1 }}>
          <Navbar />

          <Box sx={{ p: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/products" element={<Products />} />
              <Route path="/Stock-history" element={<StockHistory />} />
              <Route path="/low-stock" element={<LowStock />} />
              <Route path="/stock-in" element={<StockIn />} />
              <Route path="/stock-out" element={<StockOut />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;