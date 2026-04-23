import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Component/Footer";
import UserDashboard from "./UserDashboard";
import AdminRoutes from "./Component/Admin/AdminRoutes";
import { CartProvider } from "./context/CartContext"; // ✅ FIXED
//import CartPage from "./Component/Pages/CartPage";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* USER ROUTES */}
          <Route path="/*" element={<UserDashboard />} />

          {/* CART PAGE */}
          

          {/* ADMIN ROUTES */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          {/* <Footer /> */}
          
        </Routes>

        {/* <Footer /> */}
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;