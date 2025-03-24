require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY; // Definir no .env

app.use(cors());
app.use(express.json());

// Rota para buscar filmes populares
app.get("/api/movies", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=pt-BR`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
});

// Rota para buscar os detalhes de um filme pelo ID
app.get("/api/movie/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=pt-BR`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar detalhes do filme" });
  }
});

// Rota para buscar filmes pela pesquisa
app.get("/api/search", async (req, res) => {
  const { query, page = 1 } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query de pesquisa é obrigatória" });
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}&language=pt-BR`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
});

// Rota para buscar os gêneros de filmes
app.get("/api/genres", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=pt-BR`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar gêneros" });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
