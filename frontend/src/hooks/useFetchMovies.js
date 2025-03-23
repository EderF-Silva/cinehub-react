import { useState, useEffect } from "react";

export function useFetchMovies(page = 1) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=8ed200f50a6942ca5bc8b5cdec27ff22&page=${page}&language=pt-BR`);
      const json = await res.json();
      setData(json.results);
      setLoading(false);
    };
    fetchMovies();
  }, [page]);

  return { data, loading };
}
