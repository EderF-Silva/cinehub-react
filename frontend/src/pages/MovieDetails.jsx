import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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

  if (loading)
    return <p className="container text-center">Carregando detalhes...</p>;
  if (!movie)
    return <p className="container text-center">Filme não encontrado.</p>;

  return (
    <div className="container">
      <Header />

      <div className="mx-5">
        <Link
          to="/"
          className="w-full block my-3 p-5 text-center bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-600 transition duration-300 flex items-center justify-center space-x-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />{" "}
          {/* Ícone de voltar */}
          <span>Voltar à lista de filmes</span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        {/* Capa do filme */}
        <div className="lg:w-1/3 flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg border border-gray-300"
            width={350}
          />
        </div>

        {/* Detalhes do filme */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {movie.title}
          </h1>
          <p className="text-xl text-gray-600 italic mb-6">{movie.tagline}</p>

          {movie.overview && (
            <div className="mb-6">
              <p className="font-semibold text-lg">Sinopse:</p>
              <p>{movie.overview}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <p>
              <strong>Data de Lançamento:</strong>{" "}
              {formatDate(movie.release_date)}
            </p>
            <p>
              <strong>Nota:</strong> {movie.vote_average} / 10
            </p>
            <p>
              <strong>Duração:</strong> {movie.runtime} min
            </p>
            <p>
              <strong>Gêneros:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
