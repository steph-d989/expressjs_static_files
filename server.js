require('dotenv').config();
//
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = 3000
const apiKey = process.env.API_KEY

// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Logger
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views','./views');
app.use(morgan(':method :host :status  - :response-time ms :body'));

// Rutas
const filmsRoutes = require("./routes/films.routes")


app.use(express.json()); // Habilito recepción de JSON en servidor

// Rutas
//WEB
//app.use('/',filmsRoutes);

//rutas vistas
app.get('/', function(req, res){
  res.render('home.pug');
});

app.post('/films', filmsRoutes)

// Para rutas no existentes
app.use('*',error404);

app.listen(port, () => {
  console.log(`Funcionando en: http://localhost:${port}`)
})