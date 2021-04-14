"use stric";

var mongoose = require("mongoose"); // Cargar el modulo de Mongoose
var Schema = mongoose.Schema; // Usar objetos Schema para la BD

// Crear objeto Schema

var CompraEsquema = Schema({
  date: { type: Date, default: Date.now },
  id_articulo: String,
  cantidad: Number,
  monto: Number,
});

module.exports = mongoose.model("Compra", CompraEsquema);
