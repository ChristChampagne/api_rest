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
  name: "EditarArticulo",
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
      isEdit:true,
      id:null,
    };
  },
  mounted() {
    //console.log(this.articulo);
    // this.save();
    //recoger el dato que llega por la URL
    this.id = this.$route.params.id;
    this.getArticulo(this.id)
  },
  methods: {
    //metodo para recojer el archivo de tipo imagen
    fileChange() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
     getArticulo(id) {
      axios.get(this.url + "buscarArticulo/" + id).then((res) => {
        if (res.data.status == "exitosa") {
          this.articulo = res.data.articulo;
          console.log(this.articulo);
        }
        //console.log(res);
      });
    },
    save() {
      //console.log(this.articulo);

      //Guardar los datos del formulario en el backend
      axios
        .put(this.url + "actualizarArticulo/"+this.id, this.articulo)
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

              var articuloid = res.data.articuloActualizado._id;

              axios
                .put(this.url + "cargarImagen/" + articuloid, formData)
                .then((res) => {
                  if (res.data.articuloActualizado) {
                    //utilizar la alerta de Vue
                    SweetAlert(
                      "Articulo Actualizado, con Imagen",
                      "El articulo actualizado correctamente",
                      "success"
                    );

                    this.articulo = res.data.articuloActualizado;
                    //redireccionar a blog
                    this.$router.push("/articulo/"+this.id);
                    console.log(this.articulo);
                  } else {
                    //mostrar alerta de error
                    SweetAlert(
                      "Fallo la Actualización",
                      "El articulo NO se ha actualizado ... verifique ",
                      "error"
                    );
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
               SweetAlert(
                      "Articulo Actualizado, sin Imagen",
                      "El articulo actualizado correctamente",
                      "success"
                    );
              //redireccionar a blog
              this.$router.push("/articulo/"+this.id);
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