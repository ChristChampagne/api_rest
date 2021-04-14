"use stric";

var mongoose = require("mongoose");   // Cargar el modulo de Mongoose
var Schema = mongoose.Schema;         // Usar objetos Schema para la BD

// Crear objeto Schema

var ArticuloEsquema = Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  image: String,
});

// Modelo articulo llamado ArticuloEsquema

module.exports = mongoose.model("Articulo", ArticuloEsquema);
