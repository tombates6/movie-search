# movie-search
Movie search web application

## Usage
- You must create a `.env` file in `webservice` with `API_TOKEN` defined. This is your personal token to access the TMDB API.
- In `webapp`, run `npm run dev`. This will bring up the web page server on `localhost:3000`.
- In `webservice`, run `npm run dev`, which will bring up the backend server on `localhost:5000`. The front end interacts with this server to get results.
- Now you may search for movies by title by visiting `localhost:3000` in your browser. **Note:** You must click the magnifying glass in the top right corner of the application to start the search.

## Roadmap
### Structure/Misc
- Allow searching by more than just the title (e.g. genre, recently released, etc.)
- Containerize the applications such that the entire service can be brought up with `docker compose`
- Host the service in the cloud (AWS, Azure, etc.)
- Introduce CI/CD practices

### GUI
- The search will not execute unless you click the magnifying glass, which is nonintuitive. Make it so the search is kicked off when the user presses "Enter."
- Refactor to use a grid of cards instead of a data table, with the image above and the various info below.
- Don't hard code the backend URL.
- Use and enforce a coding standard.
- Make tests.
- Don't call the backend on mount.
- Change the MDI icon next to the title to be a movie icon

### Backend
- Use and enforce a coding standard, including moving to TS.
- Create a DAO layer, rather than interacting directly with TMDB from the service layer.
