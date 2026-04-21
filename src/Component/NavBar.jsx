import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { cartCount } = useCart();

  const token = localStorage.getItem("token");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/search?query=${search}`);
    setSearch("");
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="bg-[#c5aa6a] text-white px-4 py-3 shadow-md">
      <div className="flex justify-between items-center">

        {/* LOGO */}
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Stich
        </h1>

        {/* DESKTOP SEARCH */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex bg-white rounded-lg overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="px-3 py-1 text-black outline-none w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-[#c5aa6a] px-3">🔍</button>
        </form>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-6 font-medium">

          <li className="cursor-pointer" onClick={() => navigate("/mens")}>Mens</li>
          <li className="cursor-pointer" onClick={() => navigate("/womens")}>Womens</li>
          <li className="cursor-pointer" onClick={() => navigate("/footwear")}>Footwear</li>
          <li className="cursor-pointer" onClick={() => navigate("/makeup")}>MakeUp</li>
          <li className="cursor-pointer" onClick={() => navigate("/assesrise")}>Accessories</li>
          <li className="cursor-pointer" onClick={() => navigate("/kids")}>Kids</li>

          {/* CART */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <span className="text-2xl">🛒</span>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* LOGIN / LOGOUT */}
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 px-3 py-1 rounded-lg"
            >
              Login
            </button>
          )}
        </ul>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col gap-3 bg-white text-black p-3 rounded-lg">

          {/* SEARCH MOBILE */}
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-1 border outline-none rounded-l"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-[#ffffff] text-white px-3 rounded-r">
              🔍
            </button>
          </form>

          {/* MENU */}
          <button onClick={() => navigate("/mens")}>Mens</button>
          <button onClick={() => navigate("/womens")}>Womens</button>
          <button onClick={() => navigate("/footwear")}>Footwear</button>
          <button onClick={() => navigate("/makeup")}>MakeUp</button>
          <button onClick={() => navigate("/assesrise")}>Accessories</button>
          <button onClick={() => navigate("/kids")}>Kids</button>

          <button onClick={() => navigate("/cart")}>
            🛒 Cart ({cartCount})
          </button>

          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white py-1 rounded"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;