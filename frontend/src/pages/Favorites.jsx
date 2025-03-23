// src/pages/Favorites.js
import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Favorites() {
  return (
    <div className="container">
      <Header />

      <div className="w-full h-full mx-auto my-8 p-8 bg-white rounded-md">
        <h1 className="text-2xl text-center font-bold text-gray-800">
          Meus Favoritos
        </h1>
        <p className="text-gray-500 text-center">
          Você ainda não tem filmes favoritos.
        </p>
      </div>

      <Footer />
    </div>
  );
}
