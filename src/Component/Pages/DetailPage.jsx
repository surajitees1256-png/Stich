import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState({});

  const getProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/product/${id}`);
      setProduct(res.data.product || res.data);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  const highSell = Number(product.qty) < 10;
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
    <div className="min-h-full bg-gray-100 p-10 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-12  flex">
        {/* IMAGE */}
        <div className="flex justify-center relative w-7xl max-w-3xl">
          <img
            src={product.image}
            alt={product.name}
            className="h-100 object-contain px-4"
          />
          {highSell && (
            <h1 className="absolute top-[-10px] left-46 bg-[#c5aa6a] text-red-500 px-3 py-1 rounded">
              🔥 High Selling
            </h1>
          )}
        </div>

        {/* DETAILS */}
        <div className="mt-6">
          <h1 className="text-xl font-bold">Product Name: {product.name}</h1>

          <p className="text-gray-500 text-lg font-semibold">
            Brand:{" "}
            {product.brand?.charAt(0).toUpperCase() + product.brand?.slice(1)}
          </p>

          <p className="mt-2 text-gray-600 font-medium">
            Description: {product.description}
          </p>

          <h2 className="text-green-600 text-2xl font-bold mt-4">
            ₹{product.price}
          </h2>

          {/* ✅ FIXED QUANTITY */}
          <div className="flex items-center gap-3 mt-4 ">
            <button
              onClick={() => decrease(product._id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              -
            </button>

            <span>{qty[product._id] || 0}</span>

            <button
              onClick={() => increase(product._id)}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              +
            </button>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-10 mt-6">
            <button className="bg-yellow-500 px-1 rounded text-white">
              Add to Cart
            </button>

            <button className="bg-black px-4 py-2 rounded text-white">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
