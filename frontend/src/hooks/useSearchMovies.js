import { useState, useEffect } from "react";

export function useSearchMovies(query, page = 1) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    const fetchMovies = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8ed200f50a6942ca5bc8b5cdec27ff22&query=${query}&page=${page}&language=pt-BR`);
      const json = await res.json();
      setData(json.results);
      setLoading(false);
    };
    fetchMovies();
  }, [query, page]);

  return { data, loading };
}
