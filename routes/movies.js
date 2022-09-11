const movieRouter = require('express').Router();

/* возвращает все сохранённые текущим  пользователем фильмы */
movieRouter.get('/', (req, res, next) => {
  res.send({ answer: 'get movies' });
  next();
});

/* создаёт фильм с переданными в теле параметрами */
movieRouter.post('/', (req, res, next) => {
  res.send({ answer: 'post movies' });
  next();
});

/* удаляет сохранённый фильм по id */
movieRouter.delete('/:movieId', (req, res, next) => {
  res.send({ answer: `delete movie with id ${req.params.movieId}` });
  next();
});

module.exports = movieRouter;
