// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://stich-backend.vercel.app/api", // ✅ safer port
  timeout: 10000, // optional safety
});

// ✅ REQUEST INTERCEPTOR
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ✅ RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔥 Handle common errors globally

    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized → logout
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        alert("Session expired. Please login again.");
        window.location.href = "/login";
      }

      if (status === 500) {
        console.log("Server error:", error.response.data);
      }
    } else {
      console.log("Network error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default API;
