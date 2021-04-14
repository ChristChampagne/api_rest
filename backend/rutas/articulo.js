"use stric";

var express = require("express");

//Utilizar el archivo de controles dentro de rutas
var ArticuloControlador = require("../controles/articulo");

//crear un objeto para generar rutas
var rutas = express.Router();

//configurar el multi-party
var multipart = require("connect-multiparty");
var md_upload = multipart({ uploadDir: "./upload/imagenes" });

//Crear Rutas de Prueba
rutas.get("/prueba_get", ArticuloControlador.prueba_get);
rutas.post("/prueba_post", ArticuloControlador.prueba_post);

//Crear las Rutas Reales para Gestionar la Collecion de Articulos
rutas.post("/insertarArticulo", ArticuloControlador.insertar); //insertar articulos
rutas.get("/buscarArticulos/:last?", ArticuloControlador.buscar); //buscar los ultimos 5 articulos que entraron a la BD
rutas.get("/buscarArticulo/:id?", ArticuloControlador.busqueda); //buscar en la colleccion un documento en especifco
rutas.put("/actualizarArticulo/:id?", ArticuloControlador.actualizar); //actualizar un articulo en especifico
rutas.delete("/eliminarArticulo/:id?", ArticuloControlador.eliminar); //eliminar un articulo en especifico
rutas.put("/cargarImagen/:id?", md_upload, ArticuloControlador.cargar_imagen); //cargar la imagen del articulo que especifico
rutas.get("/sacarImagen/:image?", ArticuloControlador.sacar_imagen); //mostrar la imagen en el cliente
rutas.get("/consultaArticulos/:cadena?", ArticuloControlador.consulta); //consular los articulos que coincidan con la cadena de busqueda

//Exportar el objeto rutas para utilizar lo fuera de aqui
module.exports = rutas;