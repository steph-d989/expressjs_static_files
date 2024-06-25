const request = require('request');
const getFilms = async (req, res) => {
    try {
        let title = req.body.title;
        let url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${title}`

        request(url, function (err, response, body) {
            if (err) {
                alert('error en el proceso')
                res.redirect('/');
            } else {
                let films = JSON.parse(body).Search;
                console.log(films);
                res.render('films', { Films: films});
            }
        });
        /* const title = req.query.title;
        console.log(title);

        if (!title) {
            return res.redirect('/');
        }

        const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${title}`;
        const response = await fetch(url);
        const movie = await response.json();
        console.log(movie);

        if (movie.Response === 'False') {
            res.render('film', { movie: null, error: 'No se encontró la película.' });
        } else {
            res.render('film', { movie, error: null });
        } */
    } catch (error) {
        console.error(error);
        res.render('film', { movie: null, error: 'Error retrieving data from OMDB API' });
    }
};

module.exports = { getFilms };
