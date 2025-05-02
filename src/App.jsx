import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarReceipt from "./components/CarReceipt";
import ClientReceiptView from "./components/ClientReceiptView";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Set AdminDashboard as the home page */}
        <Route path="/" element={<AdminDashboard />} />

        {/* Route for viewing the client receipt */}
        <Route path="/client/receipt/:id" element={<ClientReceiptView isAdmin={false} />} />

        {/* Admin-specific route for viewing receipt */}
        <Route path="/create-receipt" element={<CarReceipt />} />
      </Routes>
    </Router>
  );
}

export default App;
