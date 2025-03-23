import Header from "../components/Header";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useGenres } from "../hooks/useGenres";
import { Link } from "react-router-dom";
import { useMoviesContext } from "../context/MoviesContext";
import "../styles/Home.css";

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

  const { data: moviesFromFetch, loading: loadingFetch } = useFetchMovies(currentPage);
  const { data: moviesFromSearch, loading: loadingSearch } = useSearchMovies(submittedQuery, currentPage);

  const genres = useGenres();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSubmittedQuery(searchQuery);
    setCurrentPage(1);
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

  if (loading) return <p className="home-container">Carregando filmes...</p>;

  if (filteredMovies.length === 0) return <p className="home-container">Nenhum filme encontrado.</p>;

  return (
    <div className="home-container">
      <Header />
      <h1>Filmes Populares</h1>

      {/* Barra de busca */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar filmes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchSubmit}>Buscar</button>
      </div>

      {/* Filtro por gênero */}
      <div className="genre-filter">
        <select onChange={handleGenreChange} value={selectedGenre}>
          <option value="">Filtrar por gênero</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de filmes */}
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>

      {/* Paginação */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={filteredMovies.length === 0}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
