const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors()); // Habilita CORS para permitir requisições do front-end

// Exemplo de rota para buscar filmes
app.get("/api/movies", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY"
    );
    res.json(response.data); // Retorna os dados para o front-end
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
