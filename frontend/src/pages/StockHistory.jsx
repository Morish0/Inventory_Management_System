import { useEffect, useState } from "react";
import { getStockHistory } from "../services/stockService";
import { TextField } from "@mui/material";

import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

function StockHistory() {

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getStockHistory();
    setHistory(data);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Stock History
      </Typography>

      <TextField
        fullWidth
        label="Search History"
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {history
              .filter(
                (item) =>item.productname.toLowerCase().includes(search.toLowerCase()) ||
                  item.transactiontype.toLowerCase().includes(search.toLowerCase()) ||
                  (item.remarks || "").toLowerCase().includes(search.toLowerCase()),
              ).map((item) => (
                <TableRow key={item.transactionid}>
                  <TableCell>{item.transactionid}</TableCell>

                  <TableCell>{item.productname}</TableCell>

                  <TableCell>{item.transactiontype}</TableCell>

                  <TableCell>{item.quantity}</TableCell>

                  <TableCell>{item.remarks}</TableCell>

                  <TableCell>
                    {new Date(item.transactiondate).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StockHistory;