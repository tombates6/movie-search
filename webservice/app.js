const express = require('express')
const app = express()
const TMDBService = require('./tmdb.js')
const tmdbService = new TMDBService()
const port = 5000

app.get('/movies', (req, res) => {
  const title = req.query['search'];
  if (!title) return next(error(400, 'search term required'));

  const movies = tmdbService.getByTitle(title);
  console.log(JSON.stringify(movies));
	res.send(JSON.stringify(movies));
})

app.listen(port, () => {
  console.log(`Movie search backend listening on port ${port}`)
})
