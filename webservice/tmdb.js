const fetch = require('node-fetch');
require('dotenv').config();

class TMDBService {
  constructor() {
    this.baseURL ='https://api.themoviedb.org/3';
    this.searchURL = `${this.baseURL}/search/movie?include_adult=false&language=en-US&region=US&page=1`;
    this.imageURL = 'https://image.tmdb.org/t/p/original';
    this.options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
      }
      // FIXME -> tlb: use an env for the token
    };
    this.responseLimit = 10;
  }

  async getByTitle(title) {
    // TODO -> tlb: make this a call to a DAO object
    const response = await fetch(this.searchURL + '&' + new URLSearchParams({ query: title }), this.options);
    const data = await response.json();
    
    const movies = this.getTrimmedMovieDetails(data);
    return movies;
  }

  getTrimmedMovieDetails(data) {
    const trimmedMovieDetails = data.results.map(movie => {
      return {
        movie_id: movie.id,
        title: movie.title,
        poster_image_url: `${this.imageURL}${movie.poster_path}`,
        popularity_summary: `${movie.popularity} out of ${movie.vote_count} votes`
      }
    }).slice(0, this.responseLimit);
    return trimmedMovieDetails;
  }
}

module.exports = TMDBService;
