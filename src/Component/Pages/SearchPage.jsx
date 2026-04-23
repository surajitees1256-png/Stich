import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useCart } from "../../context/CartContext";

function SearchPage() {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const query = new URLSearchParams(location.search).get("query") || "";
  const URL = import.meta.env.VITE_API_URL;
  // 📦 fetch products
  const getProducts = async () => {
    try {
      const res = await API.get(`${URL}/products||/products`);
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // 🔍 FILTER (name + brand together)
  const filteredProducts = products.filter((item) => {
    const name = item.name?.toLowerCase() || "";
    const brand = item.brand?.toLowerCase() || "";
    const q = query.toLowerCase();

    return name.includes(q) || brand.includes(q);
  });

  // qty
  const increase = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrease = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  // add to cart
  const handleAddToCart = (item) => {
    const quantity = qty[item._id] ?? 0;

    if (quantity === 0) {
      alert("Select quantity");
      return;
    }

    addToCart({
      productId: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity,
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Search Results: "{query}"
      </h1>

      {/* EMPTY STATE FIXED */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full object-contain"
              />

              <h2 className="font-semibold mt-2">{item.name}</h2>
              <p className="text-gray-500">{item.brand}</p>
              <p className="text-green-600 font-bold">
                ₹{item.price}
              </p>

              {/* qty */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decrease(item._id)}
                  className="px-2 bg-red-500 text-white"
                >
                  -
                </button>

                <span>{qty[item._id] || 0}</span>

                <button
                  onClick={() => increase(item._id)}
                  className="px-2 bg-green-500 text-white"
                >
                  +
                </button>
              </div>

              {/* actions */}
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full mt-2 bg-yellow-500 text-white py-1 rounded"
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate(`/detail/${item._id}`)}
                className="w-full mt-2 bg-black text-white py-1 rounded"
              >
                View Detail
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;