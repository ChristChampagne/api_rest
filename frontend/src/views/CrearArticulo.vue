<template src="./CrearArticulo.html"></template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Footer from "../components/Footer.vue";

//importar la libreria del validate
//import {required,minLength} from 'vuelidate/lib/validators';

//importar la libreria de axios para realizar peticiones HTTP en vue al node
import axios from "axios";

//importar la ruta global
import Global from "../Global";

//importar el modelo
import ModeloArticulo from "../model/Articulo.js";

//importar la libreria de alertas "sweetalert"
import SweetAlert from "sweetalert";

export default {
  name: "CrearArticulo",
  components: {
    Header,
    Sidebar,
    Footer,
  },
  data() {
    return {
      url: Global.url,
      articulo: new ModeloArticulo("", "", null, ""),
      file: "",
    };
  },
  mounted() {
    //console.log(this.articulo);
    // this.save();
  },
  methods: {
    //metodo para recojer el archivo de tipo imagen
    fileChange() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    save() {
      //console.log(this.articulo);

      //Guardar los datos del formulario en el backend
      axios
        .post(this.url + "insertarArticulo", this.articulo)
        .then((res) => {
          if (res.data.status == "exitosa") {
            if (
              this.file != null &&
              this.file != undefined &&
              this.file != ""
            ) {
              //Subida de archivo
              const formData = new FormData();
              formData.append("file0", this.file, this.file.name);

              var articuloid = res.data.articuloInsertado._id;

              axios
                .put(this.url + "cargarImagen/" + articuloid, formData)
                .then((res) => {
                  if (res.data.articuloActualizado) {
                    //utilizar la alerta de Vue
                    SweetAlert(
                      "Articulo Creado, con Imagen",
                      "El articulo se ha creado correctamente",
                      "success"
                    );

                    this.articulo = res.data.articuloActualizado;
                    //redireccionar a blog
                    this.$router.push("/blog");
                    console.log(this.articulo);
                  } else {
                    //mostrar alerta de error
                    SweetAlert(
                      "Fallo la Creacion",
                      "El articulo NO se ha guardado ... verifique ",
                      "error"
                    );
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
               SweetAlert(
                      "Articulo Creado, sin Imagen",
                      "El articulo se ha creado correctamente, sin Imagen",
                      "success"
                    );
              //redireccionar a blog
              this.$router.push("/blog");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, //fin del metodo save()
  }, //fin de methods
};
</script>



