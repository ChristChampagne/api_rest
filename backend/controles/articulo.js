'use stric'

var Articulo = require('../modelos/articulo');

//Crear un objeto que se llame validacion para validar los datos que se ingresan a la collecion Articulos
var validacion = require('validator');

var fs = require('fs'); //trabajar con archivos o gestionar los files
var path = require('path'); //trabajar con la ruta de los archivos


//Crear el objeto controlador con el cual se pueda
//hacer la gestion de la colleccion articulos

var controlador = {

    //rutas y metodos de prueba

    prueba_get: (req, res) => {
        return res.status(200).send({
            materia: 'Aplicaciones Web para I4.0',
            carrera: 'Tecnologias de la Información',
            cuatrimestre: 'Quinto',
            docente: 'Dagoberto Fiscal'
        });
    },

    prueba_post: (req, res) => {
        var mensaje = req.body.mensaje1;

        return res.status(200).send({
            materia: 'Aplicaciones Web para I4.0',
            area: 'Desarrollo Multiplatadorma',
            url: 'utd.edu.mx',
            mensaje
        });
    },

    //metodos para gestionar (insertar, buscar, actuañizar y eliminar) 
    //la BD de "api_rest" especificamente la 
    //collecion de "articulos" 

    insertar: (req, res) => {
        //recoger los parametros con el metodo post
        var params = req.body;

        //crear el objeto para guardar los valores del articulo
        var articulo = new Articulo();

        //asignar valores
        articulo.title = params.title;
        articulo.content = params.content;
        articulo.image = null;

        //validar que la informacion este completa
        try {
            var validar_title = !validacion.isEmpty(params.title);
            var validar_content = !validacion.isEmpty(params.content);
        } catch (err) {
            return res.status(404).send({
                //Error 
                status: 'error',
                mensaje: 'Faltan datos por enviar'
            })
        }


        if (validar_title && validar_content) {
            //Datos correctos y completos 
            //puede guardar el documento 

            //Guardar los articulos en la BD de Mongo
            articulo.save((err, articuloInsertado) => {
                if (err || !articuloInsertado) {
                    return res.status(404).send({
                        //Error al insertar el registro
                        status: 'error',
                        mensaje: 'El articulo no se ha guardado'
                    })
                }

                //devolver una respuesta
                return res.status(200).send({
                    //registro insertado con exito
                    status: 'exitosa',
                    articuloInsertado
                })


            });
        } else {
            return res.status(404).send({
                //Error 
                status: 'Error',
                mensaje: 'Los datos no son vaidos por favor verifique'
            })
        }




    },

    //consultar los ultimos 5 articulos que se ingresaron a la BD 
    buscar: (req, res) => {
        var ultimo = req.params.last;
        var consulta = Articulo.find({});

        if (ultimo || ultimo != undefined) {
            consulta.limit(5);
        }

        //Ejecutar la consulta a la BD de Mongo para mostrar los registros en JSON
        consulta.sort('-_id').exec((err, articulos) => {

            if (err) {
                return res.status(500).send({
                    //Error
                    status: 'error',
                    mensaje: 'Error al ejecutar la consulta'
                })
            }

            if (!articulos) {
                return res.status(404).send({
                    //Error
                    status: 'error',
                    mensaje: 'No existen articulos en la BD que mostrar'
                })
            }

            return res.status(200).send({
                //Consulta ejecutada con exito
                status: 'exitosa',
                articulos
            })
        })

    },

    //consultar un documento (registro) en particular
    busqueda: (req, res) => {
        //recojer el parametro necesario
        var articuloid = req.params.id;

        //verificar que reciba parametro en la consulta
        if (!articuloid || articuloid == null) {
            return res.status(404).send({
                //ERROR: No ha ingresado un id a buscar 
                status: 'error',
                mensaje: 'No ha ingresado un id a buscar'
            })
        }

        //buscar el articulo en la colleccion
        Articulo.findById(articuloid, (err, articulo) => {
            if (err || !articulo) {
                return res.status(404).send({
                    //ERROR: registro no encontrado 
                    status: 'error',
                    mensaje: 'registro NO encontrado'
                })
            }

            return res.status(200).send({
                //registro encontrado con exito
                status: 'exitosa',
                articulo
            })
        });
    },

    actualizar: (req, res) => {
        //recojer el parametro necesario
        var articuloid = req.params.id;

        //recojer los parametros que llegan por put
        var params = req.body;

        //validar que la informacion este completa
        try {
            var validar_title = !validacion.isEmpty(params.title);
            var validar_content = !validacion.isEmpty(params.content);
        } catch (err) {
            return res.status(404).send({
                //Error 
                status: 'error',
                mensaje: 'Faltan datos por enviar'
            })
        }


        if (validar_title && validar_content) {
            //colocar el metodo de busqueda y actualizacion
            Articulo.findOneAndUpdate({ _id: articuloid }, params, { new: true }, (err, articuloActualizado) => {

                if (err) {
                    return res.status(404).send({
                        //Error 
                        status: 'error: ',
                        mensaje: 'No de es posible actualizar el registro'
                    })
                }

                if (!articuloActualizado) {
                    return res.status(404).send({
                        //Error 
                        status: 'error: ',
                        mensaje: 'No existe el registro a modificar'
                    })
                }



                return res.status(200).send({
                    //resgistro actualizado con exito
                    status: 'exitosa',
                    articuloActualizado
                })
            })
        } else {
            return res.status(404).send({
                //Error 
                status: 'error',
                mensaje: 'Los datos no son validos por favor verifique'
            })
        }

    },

    eliminar: (req, res) => {
        //recojer el parametro necesario
        var articuloid = req.params.id;

        //validar que se alla ingresado un id
        if (!articuloid || articuloid == null) {
            return res.status(404).send({
                //Error
                status: 'error',
                mensaje: 'Le falta ingresar en ID del articulo a eliminar'
            })
        }

        //Eliminar el registro 
        Articulo.findOneAndDelete({ _id: articuloid }, (err, articuloEliminado) => {
            if (err) {
                return res.status(500).send({
                    //Error al intentar eliminar el articulo
                    status: 'error',
                    mensaje: 'Error al intentar eliminar el articulo'
                })
            }

            if (!articuloEliminado) {
                return res.status(404).send({
                    //Error no se encuentra ese articulo con el id a buscar por lo tanto no lo puede eliminar
                    status: 'error',
                    mensaje: 'Error no se encuentra ese articulo con el id a buscar por lo tanto no lo puede eliminar'
                })
            }

            return res.status(200).send({
                //Registro Eliminado
                status: 'exitosa',
                articuloEliminado
            })
        })
    },

    cargar_imagen: (req, res) => {


        //Configurar el modulo connect multiparty rutas/articulo.js

        //recoger el fichero de la peticion
        var nombre_archivo = 'Imagen no subida ...';

        //recoger el archivo a subir 
        var ruta_archivo = req.files.file0.path; //ruta y sube el archivo al servidor

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: nombre_archivo

            });
        }

        // //Separar y a seleccionar el nombre del archivo
        var nombre_split = ruta_archivo.split('/'); //arreglo 



        // //En Windows es  OJO OJO 
        //var nombre_split=ruta_archivo.split('\\');

        // //Recoger el nombre del archivo de la ruta 
        nombre_archivo = nombre_split[2];


        //Escojer la extension del archivo 
        var extension_split = nombre_archivo.split('.'); //arreglo 
        var extencion_archivo = extension_split[1];

        //verificar que la ruta del archivo sea de una imagen
        if (extencion_archivo == 'jpg' || extencion_archivo == 'jpeg' || extencion_archivo == 'png' || extencion_archivo == 'gif') {
            //recoger el ID de URL 
            var articuloid = req.params.id;

            //Actualizar el nombre o el valor del campo IMAGE de la collecion articulos
            Articulo.findOneAndUpdate({ _id: articuloid }, { image: nombre_archivo }, { new: true }, (err, articuloActualizado) => {

                if (err || !articuloActualizado) {
                    return res.status(200).send({
                        status: 'error',
                        message: 'Error al guardar la imagen del articulo ...'
                    });
                }


                return res.status(200).send({
                    //Registro con el nombre de la Imagen actualizada
                    status: 'exitosa',
                    articuloActualizado
                });
            })


        } else {

            //borrar del servidor el archivo incorrecto
            fs.unlink(ruta_archivo, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extencion de la imagen no es valida'
                });
            });

        }
    },

    //mosrar la imagen o regresar la imagen al cliente Rest 
    sacar_imagen: (req, res) => {
        //sacar el archivo de imagen 
        var archivo = req.params.image;

        //obtener la ruta completa del archivo
        var ruta_archivo = './upload/imagenes/' + archivo;

        //comprobar que exista el archivo en la ruta 
        fs.exists(ruta_archivo, (existe) => {

            if (existe) {
                //si el archivo si existe
                //utlizar la libreria path y devolver la imagen
                return res.sendFile(path.resolve(ruta_archivo)); //resolver la ruta y regresar el archivo
            } else {
                //si el archivo no existe
                return res.status(404).send({
                    status: 'error',
                    mensaje: 'Error la imagen no existe en la ruta especificada'
                })

            }
        });
    },

    //consultar los documentos que coincidad con un parametro de busqueda
    consulta: (req, res) => {

        //obtener la cadena a buscar 
        var cadena = req.params.cadena;

        //Buscar la coincidencia de la cadena 
        //Si el valor de la "cadena" esta incluido (i) dentro del "title" entonces va a 
        //sacar los articulos que coincidad O si el valor de la "cadena" esta incluido (i) dentro
        //del content entonces va a sacar los articulos que coincidad 
        Articulo.find({
                "$or": [
                    { "title": { "$regex": cadena, "$options": "i" } },
                    { "content": { "$regex": cadena, "$options": "i" } }
                ]
            })
            .sort('-date')
            .exec((err, articulos) => {
                if (err) {
                    return res.status(500).send({
                        //Error
                        status: 'error',
                        mensaje: 'No se puede realizar la consulta'
                    })
                }

                if (!articulos) {
                    return res.status(404).send({
                        //Error
                        status: 'error',
                        mensaje: 'No existen articulos que coincidan con el parametro de busqueda'
                    })
                }

                return res.status(200).send({
                    //Consulta Exitosa
                    status: 'exitosa',
                    articulos
                })
            });
    }
};

//Exportar mi objeto "controlador" para utilizar lo fuera de aqui 
module.exports = controlador;