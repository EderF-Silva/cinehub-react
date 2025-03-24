const TMDB_API_KEY = process.env.TMDB_API_KEY; // Definir no .env
const axios = require("axios");
const service = require('./service.js');


exports.getMovies = async (req, res) => {
    try {
        
        const filmes = await service.getMovies();

        res.json(filmes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar filmes" });
    }
}
exports.getMovieInfo = async (req, res) => {
    try {  
        const { id } = req.params;

        const filmeInfo = await service.getMovieInfo(id);
  
        res.json(filmeInfo);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar filmes" });
    }
}
exports.searchMovies = async (req, res) => {
    try {
        const { query, page = 1 } = req.query;
            if (!query) {
                return res.status(400).json({ error: "Query de pesquisa é obrigatória" });
            }


        const movies = await service.searchMovies(query, page);

        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar filmes" });
    }
}
exports.moviesGenres = async (req, res) => {
    try {
        
        const genres = await service.moviesGenres();

        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar filmes" });
    }
}