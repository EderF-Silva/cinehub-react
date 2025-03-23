import React from "react";
import Header from "../components/Header";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useGenres } from "../hooks/useGenres";
import { Link } from "react-router-dom";
import { useMoviesContext } from "../context/MoviesContext";
import Footer from "../components/Footer";

export default function Home() {
  const {
    searchQuery,
    setSearchQuery,
    submittedQuery,
    setSubmittedQuery,
    selectedGenre,
    setSelectedGenre,
    currentPage,
    setCurrentPage,
  } = useMoviesContext();

  const { data: moviesFromFetch, loading: loadingFetch } =
    useFetchMovies(currentPage);
  const { data: moviesFromSearch, loading: loadingSearch } = useSearchMovies(
    submittedQuery,
    currentPage
  );

  const genres = useGenres();

  const handleSearchSubmit = () => {
    setSubmittedQuery(searchQuery);
    setCurrentPage(1); // Reset to page 1 after a new search
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const movies = submittedQuery ? moviesFromSearch : moviesFromFetch;
  const loading = submittedQuery ? loadingSearch : loadingFetch;

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(Number(selectedGenre)))
    : movies;

  if (loading) return <div className="container">Carregando filmes...</div>;

  if (filteredMovies.length === 0)
    return <div className="container">Nenhum filme encontrado.</div>;

  return (
    <div className="container">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
      />

      {/* Filtro por gênero */}
      <div className="container mx-auto px-10 mt-6">
        <select
          onChange={handleGenreChange}
          value={selectedGenre}
          className="w-full sm:w-80 p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition duration-300 ease-in-out"
        >
          <option value="" className="text-gray-500">
            Filtrar por gênero
          </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id} className="text-gray-700">
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de filmes */}
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
          {filteredMovies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="movie-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-100 object-cover rounded-t-lg" // Imagem proporcional com borda arredondada no topo
              />
              <div className="p-4 flex flex-col justify-between h-full">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {movie.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-center mt-6 space-x-2 pt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-300"
        >
          Anterior
        </button>

        <span className="text-lg font-medium text-gray-700">
          Página {currentPage}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={filteredMovies.length === 0}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-300"
        >
          Próxima
        </button>
      </div>

      <Footer />
    </div>
  );
}
