"use stric";

var express = require("express");

// Usar el archivo de controles para establecer rutas

var ArticuloControlador = require("../controllers/articulo");

// Crear el objeto para las rutas

var rutas = express.Router();

// Configurar Connect Multiparty

var multiparty = require('connect-multiparty');
var md_upload = multiparty({ uploadDir: './upload/images' });

// Creación de Rutas de prueba

rutas.get("/prueba_get", ArticuloControlador.prueba_get);
rutas.post("/prueba_post", ArticuloControlador.prueba_post);

// Crear las Rutas para la gestion de la BD

rutas.post("/insertarArticulo", ArticuloControlador.insertar);
rutas.get("/buscarArticulos/:last?", ArticuloControlador.buscar);
rutas.get("/buscarArticulo/:id?", ArticuloControlador.busqueda);
rutas.put("/actualizarArticulo/:id?", ArticuloControlador.actualizar);
rutas.delete("/eliminarArticulo/:id?", ArticuloControlador.eliminar);
rutas.put("/cargarImagen/:id?", md_upload, ArticuloControlador.cargar_imagen);
rutas.get("/sacarImagen/:image?", ArticuloControlador.sacar_imagen);
rutas.get("/consultaArticulos/:cadena?", ArticuloControlador.consulta);

module.exports = rutas;
