import React, { useState } from "react";
import axios from "axios";

function RegisterProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    description: "",
    qty:"",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ handle image
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("image", image);
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("brand", formData.brand);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("qty", formData.qty);

      const res = await axios.post(
        "https://stich-backend.vercel.app/api/product/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 IMPORTANT
          },
        }
      );

      alert("✅ Product Created Successfully");

      // reset form
      setFormData({
        name: "",
        price: "",
        brand: "",
        category: "",
        description: "",
        qty:"",
      });

      setImage(null);
      setPreview(null);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "❌ Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded-lg"
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="w-full p-2 border rounded-lg"
          />
          <input
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            placeholder="qty"
            type="number"
            className="w-full p-2 border rounded-lg"
          />

          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full p-2 border rounded-lg"
          />

          <select
            name="category"
            value={formData.category}
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

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded-lg"
          />

          <input type="file" onChange={handleImage} />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover rounded-lg border"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? "Uploading..." : "Submit"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default RegisterProduct;
