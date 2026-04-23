import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function ShopByPrice() {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(12);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const URL = import.meta.env.VITE_API_URL;
  // ✅ Fetch products
  const getProducts = async () => {
    try {
      const res = await API.get(`${URL}/products||/products`);
      const data = res.data.products || res.data || [];
      setProducts(data);
    } catch (error) {
      console.log("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ✅ Filter (SAFE)
  const filteredProducts = products.filter(
    (item) => Number(item.price) < 1000
  );

  // ✅ Slice products
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // 🔹 Qty handlers
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

  // 🔹 Add to Cart
  const handleAddToCart = (item) => {
    const quantity = qty[item._id] || 0;

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

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Product Less Than ₹1000
      </h1>

      {/* DEBUG (optional) */}
      {/* <p>Total: {filteredProducts.length}</p> */}

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No Products Found
        </p>
      ) : (
        <>
          {/* PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
              >
                <div className="h-48 flex items-center justify-center bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full object-contain"
                  />
                </div>

                <div className="p-4">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-500 text-sm">{item.brand}</p>
                  <p className="text-green-600 font-bold mt-1">
                    ₹{item.price}
                  </p>

                  {/* Quantity */}
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
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 mt-3">
                    <button
                      disabled={(qty[item._id] || 0) === 0}
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

          {/* ✅ LOAD MORE */}
          {visibleCount < filteredProducts.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  console.log("Clicked Load More"); // debug
                  setVisibleCount((prev) => prev + 12);
                }}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                More Product
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ShopByPrice;