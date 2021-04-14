"use stric";

var express = require("express");

// Usar el archivo de controles para establecer rutas

var CompraControlador = require("../controllers/compra");

// Crear el objeto para las rutas

var rutas = express.Router();

// Configurar Connect Multiparty

var multiparty = require('connect-multiparty');

// Creación de Rutas

rutas.post("/insertarCompra", CompraControlador.insertar);
rutas.get("/busquedaCompra/:id?", CompraControlador.busqueda);
rutas.get("/buscarCompras/:last?", CompraControlador.buscar);
rutas.put("/actualizarCompra/:id?/:cantidad/:monto", CompraControlador.actualizar);
rutas.delete("/eliminarCompra/:id?", CompraControlador.eliminar);



module.exports = rutas;