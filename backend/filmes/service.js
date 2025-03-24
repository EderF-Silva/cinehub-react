const TMDB_API_KEY = process.env.TMDB_API_KEY;
const axios = require("axios");


exports.getMovies = (page) => {
    return new Promise(async (resolve, reject) => {
        try {

            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=pt-BR&page=${page}`
            );

            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
}


exports.getMovieInfo = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(" iouidasd");

            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${ id }?api_key=${ TMDB_API_KEY }&language=pt-BR`
            );

            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
}


exports.searchMovies = (query, page = 1 ) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(" iouidasd");

            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}&language=pt-BR`
            );
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
}

exports.moviesGenres = ( ) => {
    return new Promise(async (resolve, reject) => {
        try {

            const response = await axios.get(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=pt-BR`
            );

            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
}
