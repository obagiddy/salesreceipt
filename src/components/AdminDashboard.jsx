import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/receipts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setReceipts(data.receipts);
      })
      .catch((error) => {
        console.error("Error fetching receipts:", error);
      });
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-gray-50 shadow-md rounded-lg space-y-6 mt-10">
      <Typography variant="h5" className="mb-6 text-blue-800 text-center md:text-left">
        Admin Panel - Recent Receipts
      </Typography>

      <div className="space-y-4">
        {receipts.length > 0 ? (
          receipts.map((receipt) => (
            <div
              key={receipt._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 shadow rounded space-y-4 md:space-y-0"
            >
              <div className="flex-1">
                <Typography variant="subtitle1" className="font-bold">
                  <strong>{receipt.buyerName}</strong>
                </Typography>
                <Typography variant="body2">Receipt #: {receipt.receiptNumber}</Typography>
                <Typography variant="body2">Transaction ID: {receipt.transactionId}</Typography>
                <Typography variant="body2" className="text-cyan-600">
                  Date: {formatDate(receipt.buyerDate)}
                </Typography>
                <Typography variant="body2">Amount: ${receipt.totalAmount}</Typography>
              </div>
              <Link to={`/client/receipt/${receipt._id}`}>
                <Button variant="outlined" color="primary" className="self-end md:self-center">
                  View Receipt
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <Typography variant="body1">No receipts found.</Typography>
        )}
        <Link to="/create-receipt">
          <Button variant="outlined" color="primary" className="self-end">
            Create New Receipt
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
