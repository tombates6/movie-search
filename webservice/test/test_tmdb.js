const assert = require('assert');
const TMDBService = require('../tmdb.js')

describe("TMDBService", function() {
  describe("#getTrimmedMovieDetails()", function() {
    it('should return a trimmed list of movie details when given a full movie description', function() {
      const input = {
        "page": 1,
        "results": [
          {
            "adult": false,
            "backdrop_path": null,
            "genre_ids": [
              18,
              36
            ],
            "id": 59470,
            "original_language": "en",
            "original_title": "Joseph Smith: The Prophet of the Restoration",
            "overview": "As narrated by his mother, Joseph Smith's life flashes as it pertains to the restoration and growth of the Church of Jesus Christ of Latter-Day Saints. Set in upstate New York, pivotal events include the first vision where Joseph saw God, the father and his son Jesus Christ; the visit of the angel Moroni and the bringing forth of the Book of Mormon.",
            "popularity": 6.359,
            "poster_path": "/c1HZoNSDxICuRIvq1TnUkol4D2F.jpg",
            "release_date": "2005-12-15",
            "title": "Joseph Smith: The Prophet of the Restoration",
            "video": true,
            "vote_average": 7,
            "vote_count": 12
          }
        ]
      };

      const expectedOutput = {
        movie_id: 59470,
        title: "Joseph Smith: The Prophet of the Restoration",
        poster_image_url: 'https://image.tmdb.org/t/p/original/c1HZoNSDxICuRIvq1TnUkol4D2F.jpg',
        popularity_summary: '6.359 out of 12 votes'
      };

      const tmdbService = new TMDBService();
      assert.deepEqual(tmdbService.getTrimmedMovieDetails(input)[0], expectedOutput);
    });
  });
});
