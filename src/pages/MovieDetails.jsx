import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/MovieDetails.css";

const API_KEY = "8ed200f50a6942ca5bc8b5cdec27ff22";
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "pt-BR";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="movie-details-container">Carregando detalhes...</p>;
  if (!movie) return <p>Filme não encontrado.</p>;

  return (
    <div className="movie-details-container">
      <Header />
      <Link to="/" className="back-link">← Voltar</Link>

      <div className="details-content">
        <img
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />

        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="movie-tagline">{movie.tagline}</p>
          
          {movie.overview && (
            <>
              <p><strong>Sinopse:</strong><br />{movie.overview}</p>
            </>
          )}

          <p><strong>Data de Lançamento:</strong> {formatDate(movie.release_date)}</p>
          <p><strong>Nota:</strong> {movie.vote_average} / 10</p>
          <p><strong>Duração:</strong> {movie.runtime} min</p>
          <p><strong>Gêneros:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
