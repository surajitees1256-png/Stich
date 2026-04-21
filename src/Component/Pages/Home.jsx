import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopByBrand from "./ShopByBrand";
import Carousel from "../Carousel";
import ShopByPrice from "./ShopByPrice";

function Home() {
  const navigate = useNavigate();

  const TOTAL_TIME = 24 * 60 * 60 * 1000;

  const [endTime] = useState(Date.now() + TOTAL_TIME);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = endTime - Date.now();

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const categories = [
    {
      img: "https://images.pexels.com/photos/15926574/pexels-photo-15926574.jpeg",
      route: "/mens",
    },
    {
      img: "https://images.pexels.com/photos/16115798/pexels-photo-16115798.jpeg",
      route: "/womens",
    },
    {
      img: "https://images.pexels.com/photos/8490973/pexels-photo-8490973.jpeg",
      route: "/footwear",
    },
    {
      img: "https://images.pexels.com/photos/7290627/pexels-photo-7290627.jpeg",
      route: "/makeup",
    },
    {
      img: "https://images.pexels.com/photos/34501351/pexels-photo-34501351.jpeg",
      route: "/assesrise",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0331/6649/1788/files/pinku.png?v=1695706047",
      route: "/kids",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">

      <Carousel />

      {/* TIMER */}
      <div className="bg-[#c5aa6a] p-3 m-2 rounded-lg shadow">
        <h1 className="text-center text-lg md:text-2xl text-orange-600 font-semibold">
          🔥 Sale Ends in{" "}
          {String(hours).padStart(2, "0")}:
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </h1>
      </div>

      {/* TITLE */}
      <div className="m-4 md:m-10">
        <h1 className="text-2xl md:text-5xl font-bold text-center md:text-left">
          Shop By Category
        </h1>
      </div>

      {/* CATEGORY GRID (RESPONSIVE) */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 p-4">
        {categories.map((cat, index) => (
          <li
            key={index}
            onClick={() => navigate(cat.route)}
            className="relative cursor-pointer overflow-hidden rounded-lg"
          >
            <img
              src={cat.img}
              alt="category"
              className="w-full h-40 sm:h-60 md:h-72 object-cover hover:scale-105 transition"
            />

            <div className="absolute inset-0 flex items-end justify-center">
              <p className="text-white text-xs sm:text-sm font-bold bg-orange-700/60 px-3 py-1 rounded">
                upto 50% OFF
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* BANNER */}
      <div className="relative h-[200px] sm:h-[300px] md:h-[500px] overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://images.pexels.com/photos/7957751/pexels-photo-7957751.jpeg"
          alt=""
        />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-lg sm:text-2xl md:text-5xl font-bold text-center">
            Grab Upto 70% OFF on Top Fashion Brands!
          </h1>
        </div>
      </div>

      <ShopByBrand />

      {/* SECOND BANNER */}
      <div
        onClick={() => navigate("/footwear")}
        className="relative h-[150px] sm:h-[250px] md:h-[500px] overflow-hidden cursor-pointer"
      >
        <img
          className="w-full h-full object-cover"
          src="https://cms.landmarkshops.in/LS-Fest/LS-new/LS-Banner7-desktop-ShoeandBags-18Dec25.gif"
          alt=""
        />
      </div>

      <ShopByPrice />
    </div>
  );
}

export default Home;