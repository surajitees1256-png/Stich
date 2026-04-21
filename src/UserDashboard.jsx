import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Component/NavBar";
import Home from "./Component/Pages/Home";
import Mens from "./Component/Pages/Mens";
import Womens from "./Component/Pages/Womens";
import Footwear from "./Component/Pages/Footwear";
import MaKeup from "./Component/Pages/MaKeup";
import Accessories from "./Component/Pages/Accessories";
import Kids from "./Component/Kids";
import Login from "./Component/Pages/Login";
import Register from "./Component/Pages/Register";
import Brands from "./Component/Brands";
import DetailPage from "./Component/Pages/DetailPage";
import CartPage from "./Component/Pages/CartPage";
import SearchPage from "./Component/Pages/SearchPage";

function UserDashboard() {
  const location = useLocation();

  // ✅ hide navbar on auth pages
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {/* ✅ Conditional Navbar */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route path="/" element={<Home />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/footwear" element={<Footwear />} />
        <Route path="/makeup" element={<MaKeup />} />
        <Route path="/assesrise" element={<Accessories />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/detail/:id" element={<DetailPage/>}/>
         <Route path="/brands/*" element={<Brands/>} />
         <Route path="/cart" element={<CartPage/>} />
         <Route path="/search" element={<SearchPage/>} />
      </Routes>
    </>
  );
}

export default UserDashboard;