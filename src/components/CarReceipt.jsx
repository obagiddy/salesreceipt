import { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CarReceipt() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    receiptNumber: "",
    dateOfPurchase: "",
    registrationNumber: "",
    make: "",
    vin: "",
    year: "",
    mileage: "",
    color: "",
    model: "",
    paymentMethod: "",
    carSalePrice: "",
    totalTax: "",
    totalAmount: "",
    sellerName: "",
    sellerDate: "",
    buyerName: "",
    buyerDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const payload = {
      buyerName: formData.buyerName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      address: formData.address,
      make: formData.make,
      model: formData.model,
      year: formData.year,
      color: formData.color,
      paymentMethod: formData.paymentMethod,
      salePrice: parseFloat(formData.carSalePrice),
      tax: parseFloat(formData.totalTax),
    };
  
    fetch("http://localhost:3000/api/receipts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || 'Failed to generate receipt');
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.receipt && data.receipt._id) {
          navigate(`/client/receipt/${data.receipt._id}`);
        }
      })
      .catch((error) => {
        alert(error.message); // Optional user-friendly message
      });
  };
  

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg space-y-8">
      <div className="text-center border-b pb-4">
        <Typography variant="h6" className="uppercase text-blue-700">
          Car Sales Receipt
        </Typography>
        <Typography variant="body2">123 Maple Street, Springfield, IL, 62704</Typography>
        <Typography variant="body2">(512) 650-8694 | brierhbrirc@gmail.com | www.herimotive.com</Typography>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Buyer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
            <TextField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} fullWidth />
            <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
            <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth />
          </div>
          <div className="space-y-4">
            <TextField label="Receipt Number" name="receiptNumber" value={formData.receiptNumber} onChange={handleChange} fullWidth disabled />
            <TextField label="Date of Purchase" name="dateOfPurchase" value={formData.dateOfPurchase} onChange={handleChange} fullWidth disabled />
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="bg-blue-800 text-white px-4 py-2 rounded mt-6">
          <Typography variant="subtitle1">Vehicle Information</Typography>
        </div>

        <div className="grid grid-cols-1 space-y-4 mb-4 md:grid-cols-2 gap-6 mt-4">
          <TextField label="Registration Number" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} fullWidth disabled />
          <TextField label="Make" name="make" value={formData.make} onChange={handleChange} fullWidth />
          <TextField label="VIN" name="vin" value={formData.vin} onChange={handleChange} fullWidth disabled />
          <TextField label="Year" name="year" value={formData.year} onChange={handleChange} fullWidth />
          <TextField label="Mileage" name="mileage" value={formData.mileage} onChange={handleChange} fullWidth disabled />
          <TextField label="Color" name="color" value={formData.color} onChange={handleChange} fullWidth />
          <TextField label="Model" name="model" value={formData.model} onChange={handleChange} fullWidth />
        </div>

        {/* Payment Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t space-y-10">
          <div className="space-y-4 bg-gray-100 p-4 rounded shadow-sm">
            <Typography variant="subtitle2" className="text-gray-800 font-medium">Payment Method</Typography>
            <TextField label="Method" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} fullWidth />
            <TextField label="Car Sale Price ($)" name="carSalePrice" value={formData.carSalePrice} onChange={handleChange} fullWidth />
            <TextField label="Total Tax ($)" name="totalTax" value={formData.totalTax} onChange={handleChange} fullWidth />
            <TextField label="Total Amount ($)" name="totalAmount" value={formData.totalAmount} onChange={handleChange} fullWidth disabled />
          </div>

          {/* Signatures */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div>
                <Typography variant="caption">Seller/Vendor</Typography>
                <div className="border-t mt-6 pt-1">[Signature]</div>
                <TextField label="Name" name="sellerName" value={formData.sellerName} onChange={handleChange} fullWidth disabled />
                <TextField label="Date" name="sellerDate" value={formData.sellerDate} onChange={handleChange} fullWidth disabled />
              </div>
              <div>
                <Typography variant="caption">Buyer</Typography>
                <div className="border-t mt-6 pt-1">[Signature]</div>
                <TextField label="Name" name="buyerName" value={formData.buyerName} onChange={handleChange} fullWidth />
                <TextField label="Date" name="buyerDate" value={formData.buyerDate} onChange={handleChange} fullWidth disabled />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center pt-6">
          <Button variant="contained" color="primary" type="submit">
            Generate Receipt
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CarReceipt;
