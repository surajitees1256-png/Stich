// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "../../context/CartContext";

function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-8">
        🛒 My Cart
      </h2>

      {cart.items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your cart is empty
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Items */}
          {cart.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain bg-gray-100 rounded"
                />

                <div>
                  <h4 className="font-semibold text-lg">
                    {item.name}
                  </h4>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.quantity - 1
                      )
                    }
                    className="px-3 py-1 bg-red-500 text-white hover:bg-red-600"
                  >
                    -
                  </button>

                  <span className="px-4">{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.quantity + 1
                      )
                    }
                    className="px-3 py-1 bg-green-500 text-white hover:bg-green-600"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.productId)}
                  className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL */}
          <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center mt-6">
            <h3 className="text-xl font-semibold">
              Total: ₹{total}
            </h3>

            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;  