"use stric";

//cargar los modulos en Node para crear el servidor
var express = require("express"); //eschuchar peticiones en HTTP
var bodyParser = require("body-parser"); //Convertir todo a JSON

//ejecutar el express
var app = express();

//cargar el body-parser para utilizar posteriormente
app.use(bodyParser.urlencoded({ extended: false }));

//asegurar que el bodyparser pueda convertir cualquier cosa en JSON
app.use(bodyParser.json());

//cargar el archivo de rutas dentro de app
const articulo_rutas = require("./rutas/articulo");
const rutas = require("./rutas/compra");

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//anadir las rutas reales
app.use("/api", articulo_rutas);
app.use("/api", rutas);

module.exports = app;
