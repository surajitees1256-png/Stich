import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-[#c5aa6a] text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      {/* LEFT LOGO */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/admin/home")}
      >
        Stich
      </h1>

      {/* MENU */}
      <div className="flex gap-6 items-center">
        <Link
          to="/admin/deshboard"
          className="hover:text-yellow-400 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/productdeshboard"
          className="hover:text-yellow-400 transition"
        >
          Add Product
        </Link>

        <Link
          to="/"
          className="hover:text-yellow-400 transition"
        >
          User Site
        </Link>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNav;