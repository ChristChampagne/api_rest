"use stric";

//cargar el modulo de mongoose para conectar con la BD de mongodb
var mongoose = require("mongoose");

//cargar el modulo app.js dentro del index,js
var app = require("./app");
var port = 3900;

//realizar una configuraciones adicioneles para que sirva correctamente Monggose
mongoose.Promise = global.Promise;

//desactivar metodos viejos del mongoose
mongoose.set("useFindAndModify", false);

//Conectar el Mongo DB con el Node JS
//mongoose.connect('mongodb://localhost:27017/api_rest?authSource=admin',{user: 'Alumno', pass: '12345'},{useNewUrlParser:true, useUnifiedTopology:true})
mongoose.connect('mongodb://localhost:27017/api_rest', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    //Conectar con el Mongo DB y el Node JS
    console.log("Conexion exitosa con Mongo DB");

    //Hacer que el Servidor Web escuche peticiones HTTP
    app.listen(port, () => {
        console.log("Servidor corriendo y listo para escuchar peticiones en: http://localhost:" + port);
    });
});