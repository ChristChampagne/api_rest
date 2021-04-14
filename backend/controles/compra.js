"use strict";

// Importar el Modelo

var Compra = require("../models/compra");

// Validación de atributos de la colección

var validacion = require("validator");

var fs = require("fs");
var path = require("path");

var controlador = {
    insertar: (req, res) => {
        var params = req.body;
        var compra = new Compra();
        compra.cantidad = params.cantidad;
        compra.monto = params.monto;
        compra.id_articulo = params.id_articulo;

        // Validar datos

        try {
            var validar_cantidad = !validacion.isEmpty(params.cantidad);
            var validar_monto = !validacion.isEmpty(params.monto);
        } catch (err) {
            return res.status(404).send({
                status: "Error",
                mensaje: "Faltan datos por enviar",
            });
        }

        if (validar_cantidad && validar_monto) {
            compra.save((err, compraInsertada) => {
                if (err || !compraInsertada) {
                    return res.status(404).send({
                        status: "Error",
                        mensaje: "Error al realizar compra",
                    });
                }

                return res.status(200).send({
                    status: "Completado",
                    compraInsertada,
                });
            });
        } else {
            return res.status(404).send({
                status: "Error",
                mensaje: "Datos no válidos verifique",
            });
        }
    },

    busqueda: (req, res) => {
        var compraid = req.params.id;

        if (!compraid || compraid == null) {
            return res.status(404).send({
                status: "Error",
                mensaje: "No se ingreso ID",
            });
        }

        Compra.findById(compraid, (err, compra) => {
            if (err || !compra) {
                return res.status(404).send({
                    status: "Error:",
                    mensaje: "Compra Inexistente",
                });
            }

            return res.status(200).send({
                status: "Compra encontrada",
                compra
            });
        });
    },

    buscar: (req, res) => {
        Compra.find((err, compra) => {
            if (err || !compra) {
                return res.status(404).send({
                    status: "Error:",
                    mensaje: "Compra Inexistente",
                });
            }

            return res.status(200).send({
                status: "Compra encontrada",
                compra,
            });
        }).sort('-date');
    },

    actualizar: (req, res) => {
        var compraid = req.params.id;
        var params = req.params;

        try {
            var validar_cantidad = !validacion.isEmpty(params.cantidad);
            var validar_monto = !validacion.isEmpty(params.monto);
        } catch (err) {
            return res.status(404).send({
                status: "Error",
                mensaje: "Faltan datos por enviar",
            });
        }

        if (validar_cantidad && validar_monto) {
            Compra.findOneAndUpdate({ _id: compraid }, params, { new: true }, (err, compraActualizada) => {
                if (err) {
                    return res.status(404).send({
                        status: "Error",
                        mensaje: "Error al Actualizar.",
                    });
                }

                if (!compraActualizada) {
                    return res.status(404).send({
                        status: "Error",
                        mensaje: "No hay compra por actualizar.",
                    });
                }

                return res.status(200).send({
                    status: "Compra Actualizada",
                    compraActualizada,
                });
            });
        } else {
            return res.status(404).send({
                status: "Error",
                mensaje: "Los datos no son valido verifique",
            });
        }
    },

    eliminar: (req, res) => {
        var compraid = req.params.id;

        if (!compraid || compraid == null) {
            return res.status(404).send({
                status: "Error",
                mensaje: "No se ingreso ID",
            });
        }

        Compra.findByIdAndDelete(compraid, (err, compra) => {
            if (err || !compra) {
                return res.status(404).send({
                    status: "Error:",
                    mensaje: "Compra no Encontrada",
                });
            }

            return res.status(200).send({
                status: "Compra Eliminada",
                compra,
            });
        });
    },

    compra: (req, res) => {
        var compra = new Compra();

        compra.id_articulo = req.params.nombre;
        compra.cantidad = req.params.cantidad;
        compra.monto = req.params.monto;

        compra.save((err, compraInsertada) => {
            if (err || !compraInsertada) {
                return res.status(404).send({
                    status: "Error",
                    mensaje: "Error al realizar compra",
                });
            }

            return res.status(200).send({
                status: "Completado",
                compraInsertada,
            });
        });
    },

    consulta: (req, res) => {

        var cadena = req.params.cadena;

        Compra.find({
                "$or": [
                    { "id_articulo": { "$regex": cadena, "$options": "i" } },
                ]
            })
            .sort('date')
            .exec((err, compras) => {
                if (err) {
                    return res.status(500).send({
                        status: 'Error',
                        mensaje: 'No se puede realizar la consulta'
                    })
                }

                if (!compras) {
                    return res.status(404).send({
                        status: 'error',
                        mensaje: 'No existen compras que coincidan con el parámetro de búsqueda'
                    })
                }

                return res.status(200).send({
                    status: 'exitosa',
                    compras
                })
            });
    }
};

module.exports = controlador;