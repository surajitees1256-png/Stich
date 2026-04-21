// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });

  const getUserId = () => localStorage.getItem("userId");

  // ✅ Fetch cart
  const fetchCart = async () => {
    try {
      const userId = getUserId();
      if (!userId) return;

      const res = await API.get(`/cart/${userId}`);
      setCart(res.data || { items: [] });
    } catch (err) {
      console.log(err.message);
    }
  };

  // 🚀 ADD TO CART (Optimistic UI)
  const addToCart = async (product) => {
    try {
      const userId = getUserId();
      if (!userId) return alert("Login first");

      // 🔥 instant UI update
      setCart((prev) => ({
        ...prev,
        items: [...prev.items, product],
      }));

      await API.post("/cart/add", { userId, product });

      fetchCart(); // sync with DB
    } catch (err) {
      console.log(err.message);
    }
  };

  // 🚀 UPDATE QUANTITY
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    const userId = getUserId();

    // 🔥 instant UI update
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      ),
    }));

    await API.put("/cart/update", {
      userId,
      productId,
      quantity,
    });
  };

  // 🚀 REMOVE ITEM
  const removeItem = async (productId) => {
    const userId = getUserId();

    // 🔥 instant UI update
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter(
        (item) => item.productId !== productId
      ),
    }));

    await API.delete("/cart/remove", {
      data: { userId, productId },
    });
  };

  // ✅ AUTO LOAD
  useEffect(() => {
    fetchCart();
  }, []);

  // 🔥 IMPORTANT (cart count)
  const cartCount = cart.items.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount, // ✅ ADD THIS
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);