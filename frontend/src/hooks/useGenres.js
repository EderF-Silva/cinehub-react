import { useState, useEffect } from "react";

export function useGenres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=8ed200f50a6942ca5bc8b5cdec27ff22&language=pt-BR`
    )
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres);
      });
  }, []);

  return genres;
}
