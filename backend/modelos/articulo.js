"use stric";

//cargar el modulo de mongoose
var mongoose = require("mongoose");

//utilizar objeto de tipo Schema para la BD No SQL
var Schema = mongoose.Schema;

//Crear mi objeto "ArticuloEsquema" de tipo Schema
var ArticuloEsquema = Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    image: String,
});

//exportar el objeto "ArticuloEsquema" con el nombre de "Articulo"
module.exports = mongoose.model("articulo", ArticuloEsquema);