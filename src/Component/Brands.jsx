import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Gucci = lazy(() => import("./Cloths/Gucci"));
const Lacoste = lazy(() => import("./Cloths/Lacoste"));
const Lv = lazy(() => import("./Cloths/Lv"));
const Spyker = lazy(() => import("./Cloths/Spykar"));
const UsPolo = lazy(() => import("./Cloths/UsPolo"));
const Zara = lazy(() => import("./Cloths/Zara"));

const BioTique = lazy(() => import("./Makeup/BioTique"));
const ColorBar = lazy(() => import("./Makeup/ColorBar"));
const Lakme = lazy(() => import("./Makeup/Lakme"));
const Lotus = lazy(() => import("./Makeup/Lotus"));
const MyGlamm = lazy(() => import("./Makeup/MyGlamm"));
const Suger = lazy(() => import("./Makeup/Suger"));

const Addidas = lazy(() => import("./Shoes/Addidas"));
const Hrx = lazy(() => import("./Shoes/Hrx"));
const NewBalance = lazy(() => import("./Shoes/NewBalance"));
const Nike = lazy(() => import("./Shoes/Nike"));
const Puma = lazy(() => import("./Shoes/Puma"));
const Skechers = lazy(() => import("./Shoes/Skechers"));

function Brands() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        {/* CLOTHS */}
        <Route path="gucci" element={<Gucci />} />
        <Route path="lacoste" element={<Lacoste />} />
        <Route path="lv" element={<Lv />} />
        <Route path="spyker" element={<Spyker />} />
        <Route path="uspolo" element={<UsPolo />} />
        <Route path="zara" element={<Zara />} />

        {/* MAKEUP */}
        <Route path="biotique" element={<BioTique />} />
        <Route path="colorbar" element={<ColorBar />} />
        <Route path="lakme" element={<Lakme />} />
        <Route path="lotus" element={<Lotus />} />
        <Route path="myglamm" element={<MyGlamm />} />
        <Route path="suger" element={<Suger />} />

        {/* SHOES */}
        <Route path="addidas" element={<Addidas />} />
        <Route path="hrx" element={<Hrx />} />
        <Route path="newbalance" element={<NewBalance />} />
        <Route path="nike" element={<Nike />} />
        <Route path="puma" element={<Puma />} />
        <Route path="skechers" element={<Skechers />} />
      </Routes>
    </Suspense>
  );
}

export default Brands;