const movieRouter = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

/* возвращает все сохранённые текущим  пользователем фильмы */
movieRouter.get('/', getMovies);

/* создаёт фильм с переданными в теле параметрами */
movieRouter.post('/', createMovie);

/* удаляет сохранённый фильм по id */
movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;
