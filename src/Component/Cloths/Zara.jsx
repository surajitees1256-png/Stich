import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
function Zara() {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const addToCart = useCart();
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ✅ Case-insensitive filter (IMPORTANT FIX)
  const gucciProducts = products.filter(
    (item) => item.brand?.toLowerCase() === "zara",
  );

  // increase qty
  const increase = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // decrease qty
  const decrease = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  // ✅ Loading state
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  // 🔹 Add to Cart
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
      <h1 className="text-3xl font-bold text-center mb-6">Zara Collection</h1>

      {gucciProducts.length === 0 ? (
        <p className="text-center text-gray-500">No Zara Products Found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gucciProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              {/* IMAGE */}
              <div className="h-48 flex items-center justify-center bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full object-contain"
                />
              </div>

              {/* DETAILS */}
              <div className="p-4">
                <h2 className="font-semibold text-lg">{item.name}</h2>

                {/* ✅ Capitalized brand display */}
                <p className="text-gray-500 text-sm">
                  {item.brand?.charAt(0).toUpperCase() + item.brand?.slice(1)}
                </p>

                <p className="text-gray-500 text-sm">{item.description}</p>

                <p className="text-green-600 font-bold mt-1">₹{item.price}</p>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decrease(item._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    -
                  </button>

                  <span>{qty[item._id] || 0}</span>

                  <button
                    onClick={() => increase(item._id)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => navigate(`/detail/${item._id}`)}
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Detail
                  </button>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col gap-2 mt-3">
                  <button
                    disabled={(qty[item._id] ?? 0) === 0}
                    className="bg-yellow-500 text-white py-1 rounded disabled:opacity-50"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="bg-black text-white py-1 rounded"
                    onClick={() => navigate("/cart")}
                  >
                    Go to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Zara;
