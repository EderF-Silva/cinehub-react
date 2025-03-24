import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header({ searchQuery, setSearchQuery, handleSearchSubmit }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar o menu de navegação
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-gray-900 text-white py-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-3xl font-bold text-red-500 hover:text-red-700 transition-all duration-300"
          >
            🎬 Cinehub
          </Link>
        </div>

        {/* Navegação para dispositivos grandes (ocultar em telas pequenas) */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-lg font-medium text-white hover:text-red-500 transition duration-300"
          >
            Filmes
          </Link>
          <Link
            to="/favorites"
            className="text-lg font-medium text-white hover:text-red-500 transition duration-300"
          >
            Favoritos
          </Link>
        </nav>

        {/* Ícone do Menu (hamburger) para telas pequenas */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <i className="fas fa-bars"></i> {/* Ícone de menu */}
        </button>

        {  /* Barra de pesquisa */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-6 py-3 w-96 text-lg rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              placeholder="Pesquise por filmes..."
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none transition duration-300"
            >
              Buscar
            </button>
          </div>
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-2xl font-bold text-white-250 hover:text-red-250 transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-2xl font-bold text-white-250 hover:text-red-250 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
              </div>

              {/* Menu de navegação para dispositivos pequenos */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-gray-800 p-4 mt-4`}
      >
        <Link
          to="/"
          className="block text-white text-lg font-medium py-2 hover:text-red-500 transition duration-300"
        >
          Filmes
        </Link>
        <Link
          to="/favorites"
          className="block text-white text-lg font-medium py-2 hover:text-red-500 transition duration-300"
        >
          Favoritos
        </Link>
      </div>
    </header>
  );
}

export default Header;
