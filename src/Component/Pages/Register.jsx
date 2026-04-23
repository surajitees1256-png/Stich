import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    role: "user",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (
      !formData.name ||
      !formData.mobile ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );

      alert("✅ Registration successful");

      // ✅ reset form
      setFormData({
        name: "",
        mobile: "",
        role: "user",
        username: "",
        email: "",
        password: "",
      });

      // ✅ redirect to login
      navigate("/login");

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "❌ Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded-lg"
          />

          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full p-2 border rounded-lg"
          />

          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="user">User</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;