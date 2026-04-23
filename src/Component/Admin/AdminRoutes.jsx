import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminNav from "./AdminNav";
import AdminHome from "./AdminHome";
import RegisterProdect from "././RegisterProdect";
import Footer from "../Footer";

function AdminRoutes() {
  return (
    <>
      <AdminNav />

      <Routes>
        <Route path="deshboard" element={<AdminHome />} />
        <Route path="productdeshboard" element={<RegisterProdect/>} />
        
      </Routes>
      <Footer/>
    </>
  );
}

export default AdminRoutes;