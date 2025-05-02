import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Button, CircularProgress } from "@mui/material";

function ClientReceiptView() {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/receipts/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Receipt not found");
          }
          return res.json();
        })
        .then((data) => {
          setReceipt(data.receipt);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  if (loading) return <div className="text-center py-10"><CircularProgress /></div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg text-sm space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-4 space-y-1">
        <Typography variant="h6" className="uppercase text-blue-700">
          Car Sales Receipt
        </Typography>
        <Typography variant="body2">123 Maple Street, Springfield, IL, 62704</Typography>
        <Typography variant="body2">(512) 650-8694 | brierhbrirc@gmail.com | www.herimotive.com</Typography>
      </div>

      {/* Buyer + Receipt Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div><strong>Name:</strong> {receipt.buyerName}</div>
          <div><strong>Phone Number:</strong> {receipt.phoneNumber}</div>
          <div><strong>Email:</strong> {receipt.email}</div>
          <div><strong>Address:</strong> {receipt.address}</div>
        </div>
        <div>
          <div><strong>Receipt Number:</strong> {receipt.receiptNumber}</div>
          <div><strong>Date of Purchase:</strong> {formatDate(receipt.buyerDate)}</div>
        </div>
      </div>

      {/* Vehicle Info Header */}
      <div className="bg-blue-800 text-white px-4 py-2 rounded">
        <Typography variant="subtitle1">Vehicle Information</Typography>
      </div>

      {/* Vehicle Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><strong>Registration Number:</strong> {receipt.registrationNumber}</div>
        <div><strong>Make:</strong> {receipt.make}</div>
        <div><strong>VIN:</strong> {receipt.vin}</div>
        <div><strong>Year:</strong> {receipt.year}</div>
        <div><strong>Mileage:</strong> {receipt.mileage}</div>
        <div><strong>Color:</strong> {receipt.color}</div>
        <div><strong>Model:</strong> {receipt.model}</div>
      </div>

      {/* Payment + Signatures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
        <div className="bg-gray-100 p-4 rounded shadow-sm space-y-2">
          <div><strong>Payment Method:</strong> {receipt.paymentMethod}</div>
          <div><strong>Car Sale Price ($):</strong> ${receipt.salePrice}</div>
          <div><strong>Total Tax ($):</strong> ${receipt.tax}</div>
          <div><strong>Total Amount ($):</strong> ${receipt.totalAmount}</div>
        </div>

        <div className="text-center text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div><strong>Seller/Vendor</strong></div>
              <div className="border-t mt-6 pt-1 h-6">[Signature]</div>
              <div>Herimotive</div>
              <div>{formatDate(receipt.sellerDate)}</div>
            </div>
            <div>
              <div><strong>Buyer</strong></div>
              <div className="border-t mt-6 pt-1 h-6">[Signature]</div>
              <div>{receipt.buyerName}</div>
              <div>{formatDate(receipt.buyerDate)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Home Button */}
      <div className="text-center">
        <Link to="/">
          <Button variant="contained" color="primary">Back Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default ClientReceiptView;
