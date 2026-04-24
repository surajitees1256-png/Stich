import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-[#c5aa6a] text-white px-4 sm:px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        
        {/* LOGO */}
        <h1
          className="text-lg sm:text-xl font-bold cursor-pointer"
          onClick={() => navigate("/admin/home")}
        >
          Stich
        </h1>

        {/* HAMBURGER */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex gap-6 items-center">
          <Link to="/admin/deshboard" className="hover:text-yellow-400">
            Dashboard
          </Link>

          <Link to="/admin/productdeshboard" className="hover:text-yellow-400">
            Add Product
          </Link>

          <Link to="/" className="hover:text-yellow-400">
            User Site
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="flex flex-col gap-4 mt-4 sm:hidden">
          <Link
            to="/admin/deshboard"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-400"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/productdeshboard"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-400"
          >
            Add Product
          </Link>

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-400"
          >
            User Site
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-2 rounded hover:bg-red-600 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default AdminNav;
