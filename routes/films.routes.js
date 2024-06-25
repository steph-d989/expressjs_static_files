const filmsController = require('../controllers/films.controller');
const router = require('express').Router();

router.post("/films", filmsController.getFilms);

module.exports = router;