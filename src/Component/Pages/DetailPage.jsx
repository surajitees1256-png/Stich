import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import { useCart } from "../../context/CartContext";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(0);

  const { addToCart } = useCart();

  // 📦 GET PRODUCT
  const getProduct = async () => {
    try {
      const res = await API.get(`/product/${id}`);
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

  // ➕➖ qty
  const increase = () => setQty((prev) => prev + 1);
  const decrease = () => setQty((prev) => (prev > 0 ? prev - 1 : 0));

  // 🛒 ADD TO CART
  const handleAddToCart = () => {
    if (qty === 0) {
      alert("Select quantity");
      return;
    }

    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qty,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-8 flex flex-col md:flex-row gap-6">

        {/* IMAGE */}
        <div className="flex justify-center relative md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="h-60 md:h-80 object-contain"
          />

          {highSell && (
            <h1 className="absolute top-2 left-2 bg-[#c5aa6a] text-red-500 px-3 py-1 rounded text-sm">
              🔥 High Selling
            </h1>
          )}
        </div>

        {/* DETAILS */}
        <div className="md:w-1/2">
          <h1 className="text-xl md:text-2xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-1">
            Brand: {product.brand}
          </p>

          <p className="mt-2 text-gray-600">
            {product.description}
          </p>

          <h2 className="text-green-600 text-xl md:text-2xl font-bold mt-3">
            ₹{product.price}
          </h2>

          {/* QTY */}
          <div className="flex items-center gap-3 mt-4">
            <button onClick={decrease} className="px-3 py-1 bg-red-500 text-white rounded">
              -
            </button>

            <span>{qty}</span>

            <button onClick={increase} className="px-3 py-1 bg-green-500 text-white rounded">
              +
            </button>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 px-4 py-2 rounded text-white w-full"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="bg-black px-4 py-2 rounded text-white w-full"
            >
              Go To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;