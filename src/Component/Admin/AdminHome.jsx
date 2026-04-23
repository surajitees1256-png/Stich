import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminHome() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({});

  // ✅ Get token once
  const token = localStorage.getItem("token");

  // ✅ GET PRODUCTS
  const getProducts = async () => {
    try {
      const res = await axios.get("https://stich-backend.vercel.app/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data.products || res.data);
    } catch (error) {
      console.log("Fetch error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // ✅ DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Delete error:", error.response?.data || error.message);
    }
  };

  // ✅ START EDIT
  const startEdit = (item) => {
    setEditId(item._id);
    setEditValues(item);
  };

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ UPDATE PRODUCT
  const updateProduct = async (id) => {
    try {
      const formData = new FormData();
      formData.append("name", editValues.name);
      formData.append("price", editValues.price);
      formData.append("brand", editValues.brand);
      formData.append("qty", editValues.qty);
      formData.append("category", editValues.category);
      formData.append("description", editValues.description);

      if (editValues.imageFile) {
        formData.append("image", editValues.imageFile);
      }

      const res = await axios.put(
        `http://localhost:5000/api/product/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updated = products.map((item) =>
        item._id === id ? res.data.product : item,
      );

      setProducts(updated);
      setEditId(null);
    } catch (error) {
      console.log("Update error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Product Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img src={item.image} alt="" className="h-full object-contain" />
            </div>

            <div className="p-4">
              {/* EDIT MODE */}
              {editId === item._id ? (
                <>
                  <input
                    name="name"
                    value={editValues.name || ""}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Name"
                  />

                  <input
                    name="price"
                    value={editValues.price || ""}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Price"
                  />

                  <input
                    name="qty"
                    value={editValues.qty || ""}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Qty"
                  />

                  <input
                    name="brand"
                    value={editValues.brand || ""}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Brand"
                  />
                  <select
                    name="category"
                    value={editValues.category || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Category</option>
                    <option>Mens</option>
                    <option>Womens</option>
                    <option>Footwear</option>
                    <option>Kidswear</option>
                    <option>Makeup</option>
                    <option>Accessories</option>
                  </select>
                  <input
                    name="description"
                    value={editValues.description || ""}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Description"
                  />

                  <input
                    type="file"
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        imageFile: e.target.files[0],
                      })
                    }
                    className="mb-3"
                  />

                  <div className="flex justify-between">
                    <button
                      onClick={() => updateProduct(item._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* VIEW MODE */}
                  <h3 className="text-lg font-semibold truncate">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm">{item.brand}</p>

                  <p className="text-gray-500 text-sm">{item.description}</p>

                  <p className="text-green-600 font-bold text-lg mt-1">
                    ₹{item.price}
                  </p>

                  <p className="text-green-600 font-bold text-sm">
                    Qty: {item.qty}
                  </p>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => startEdit(item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
