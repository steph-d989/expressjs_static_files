/* const request = require('request');

const getFilms = async (req, res) => {
    try {
        let title = req.body.title;
        let url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${title}`

        request(url, function (err, response, body) {
            if (err) {
                console.log('error en el proceso')
                res.redirect('/');
            } else {
                let films = JSON.parse(body).Search;
                console.log(films);
                res.render('film.pug', { Films: films });
            }
        });
    } catch (error) {
        console.error(error);
        res.render('/film.pug', { movie: null, error: 'Error retrieving data from OMDB API' });
    }
};
 */

const axios = require('axios');

const getFilms = async (req, res) => {
    try {
        let title = req.body.title;
        let url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${title}`;

        const response = await axios.get(url);
        const films = response.data.Search;

        if (!films) {
            res.redirect('/', { Films: [], error: 'No films found' });
        } else {
            console.log(films);
            res.render('film', { Films: films });
        }
    } catch (error) {
        console.error(error);
        res.redirect('/', { Films: [], error: 'Error retrieving data from OMDB API' });
    }
};

module.exports = { getFilms };
