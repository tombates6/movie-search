const express = require('express')
const cors = require('cors')
const app = express()
const TMDBService = require('./tmdb.js')
const tmdbService = new TMDBService()
const port = 5000

app.use(cors())

app.get('/movies', (req, res) => {
  const title = req.query['search'];
  if (!title) return next(error(400, 'search term required'));

  tmdbService.getByTitle(title).then(movies => {
    console.log(JSON.stringify(movies));
    res.send(JSON.stringify(movies));
  });
})

app.listen(port, () => {
  console.log(`Movie search backend listening on port ${port}`)
})
