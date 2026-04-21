import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminNav from "./AdminNav";
import AdminHome from "./AdminHome";
import RegisterProdect from "././RegisterProdect";

function AdminRoutes() {
  return (
    <>
      <AdminNav />

      <Routes>
        <Route path="deshboard" element={<AdminHome />} />
        <Route path="productdeshboard" element={<RegisterProdect/>} />
      </Routes>
    </>
  );
}

export default AdminRoutes;