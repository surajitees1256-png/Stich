import React from "react";
import { useNavigate } from "react-router-dom";

function ShopByBrand() {
  const navigate = useNavigate();

  const brands = [
    {
      name: "Puma",
      path: "puma",
      img: "https://i.pinimg.com/736x/af/7f/fb/af7ffba8a62e6ad77933211a19ac2ef9.jpg",
    },
    {
      name: "Adidas",
      path: "addidas",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHxE1kWdBGheJo1OJ3ezvioqphPoW94HoxdQ&s",
    },
    {
      name: "Nike",
      path: "nike",
      img: "https://img.icons8.com/color/1200/nike.jpg",
    },
    {
      name: "New Balance",
      path: "newbalance",
      img: "https://fabrikbrands.com/wp-content/uploads/New-Balance-Logo-1.png",
    },
    {
      name: "HRX",
      path: "hrx",
      img: "https://etimg.etb2bimg.com/thumb/msid-105928240,width-1200,height-900,resizemode-4/.jpg",
    },
    {
      name: "Skechers",
      path: "skechers",
      img: "https://fabrikbrands.com/wp-content/uploads/Sketchers-Logo-History-1-1155x770.png",
    },

    {
      name: "LV",
      path: "lv",
      img: "https://assets.turbologo.com/blog/en/2020/01/19084710/louis-vuitton-cover.png",
    },
    {
      name: "Gucci",
      path: "gucci",
      img: "https://static.vecteezy.com/system/resources/previews/023/870/050/non_2x/gucci-brand-logo-clothes-with-name-symbol-design-fashion-illustration-free-vector.jpg",
    },
    {
      name: "Spyker",
      path: "spyker",
      img: "https://media.licdn.com/dms/image/v2/C510BAQHLya9ZqFuR_Q/company-logo_200_200/company-logo_200_200/0/1630614651814/spykar_lifestyles_pvt_ltd_logo?e=2147483647&v=beta&t=lihzy9i9tChNATFoB1k_2Vxm9mR7tPLXymzFpDPMug8",
    },
    {
      name: "Lacoste",
      path: "lacoste",
      img: "https://static.vecteezy.com/system/resources/previews/023/867/279/non_2x/lacoste-brand-logo-symbol-with-name-design-clothes-fashion-illustration-with-green-background-free-vector.jpg",
    },
    {
      name: "USPolo",
      path: "uspolo",
      img: "https://static.vecteezy.com/system/resources/previews/024/455/681/non_2x/us-polo-assn-brand-logo-symbol-with-name-white-clothes-design-icon-abstract-illustration-with-blue-background-free-vector.jpg",
    },
    {
      name: "Zara",
      path: "zara",
      img: "https://static.vecteezy.com/system/resources/thumbnails/024/131/336/small_2x/zara-brand-logo-symbol-clothes-black-design-icon-abstract-illustration-free-vector.jpg",
    },

    //makeup

    {
      name: "BioTique",
      path: "biotique",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZkPftq5gNG1GwqVWtvvtEbxcpgqndxsBe9g&s",
    },
    {
      name: "ColorBar",
      path: "colorbar",
      img: "https://cdn.theorg.com/15f80413-8ac6-4f58-8479-93759d1a1af4_small.jpg",
    },
    {
      name: "Lakme",
      path: "lakme",
      img: "https://www.marketing91.com/wp-content/uploads/2017/01/Lakme.jpg",
    },
    {
      name: "Lotus",
      path: "lotus",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgRvdjBz1HP4Z07CGQWjGFO1w7jhv5pINEpA&s",
    },
    {
      name: "MyGlamm",
      path: "myglamm",
      img: "https://businessoutreach.in/wp-content/uploads/2021/12/Feels-glamorous-effortlessly..jpg",
    },
    {
      name: "Suger",
      path: "suger",
      img: "https://mir-s3-cdn-cf.behance.net/projects/404/fe1174173674483.Y3JvcCwxODg1LDE0NzQsMjIzLDE0OQ.gif ",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Shop By Top Brand</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.path}
            onClick={() => navigate(`/brands/${brand.path}`)}
            className="cursor-pointer flex flex-col items-center"
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="w-40 h-40 rounded-full hover:scale-105 transition"
            />
            <p className="mt-2 font-semibold">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopByBrand;
