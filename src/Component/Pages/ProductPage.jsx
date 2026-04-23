import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});

  const navigate = useNavigate();

  // 🔥 get dynamic params from URL
  const { type, value } = useParams(); 
  // example: /products/category/Mens
  // type = "category", value = "Mens"

  const getProducts = async () => {
    try {
      const res = await axios.get("https://stich-backend.vercel.app/api/products");
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // 🔥 Dynamic filter
  const filteredProducts = products.filter((item) => {
    if (!item[type]) return false;
    return item[type].toLowerCase() === value.toLowerCase();
  });

  // quantity functions
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 🔥 Dynamic Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        {value} Collection
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No Products Found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
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
                <p className="text-gray-500 text-sm">{item.brand}</p>
                <p className="text-gray-500 text-sm">{item.description}</p>

                <p className="text-green-600 font-bold mt-1">
                  ₹{item.price}
                </p>

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
                  <button className="bg-yellow-500 text-white py-1 rounded">
                    Add to Cart
                  </button>

                  <button className="bg-black text-white py-1 rounded">
                    Buy Now
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

export default ProductPage;
