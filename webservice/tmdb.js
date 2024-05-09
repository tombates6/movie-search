const fetch = require('node-fetch');

class TMDBService {
  constructor() {
    this.url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&region=US&page=1';
    this.options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2NlNjNhYjE1MjMzNDE3NmMzMzY4ZmMzNTZjZjRkZSIsInN1YiI6IjY2M2NkMjIzZjU2YTdkYmI2MmRiOGY0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sDQigvXTR3c78dHvlByOTP6RYvQseqKhecBDmodyrrE'
      }
      // FIXME -> tlb: use an env for the token
    };
    this.responseLimit = 10;
  }

  async getByTitle(title) {
    // TODO -> tlb: make this a DAO call
    const response = await fetch(this.url + '&' + new URLSearchParams({ query: title }), this.options);
    const data = await response.json();
    
    return this.getTrimmedMovieDetails(data);
  }

  getTrimmedMovieDetails(data) {
    const trimmedMovieDetails = data.results.map(movie => {
      return {
        movie_id: movie.id,
        title: movie.title,
        poster_image_url: movie.poster_path, //TODO -> tlb: create a FQDM URL. This is just an endpoint rn
        popularity_summary: `${movie.popularity} out of ${movie.vote_count} votes`
      }
    }).slice(0, this.responseLimit);
    return trimmedMovieDetails;
  }
}

module.exports = TMDBService;
