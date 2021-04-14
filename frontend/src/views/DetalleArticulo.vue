<template>
  <div class="blog">
    <Header />
    <div class="center">
      <section id="content">
        <article class="article-item" v-if="articulo">
          <div class="image-wrap" v-if="articulo.image">
            <img :src="url + 'sacarImagen/' + articulo.image" :alt="articulo.title" />
          </div>

          <h1 class="subheader">{{ articulo.title }}</h1>
          <span class="date">
            {{ articulo.date | moment("from", "now") }}
          </span>
          <p>
            {{ articulo.content }}
          </p>
          <div class="clearfix"></div>

          <router-link :to="editararticulo / +articulo._id" class="btn btn-update">Editar</router-link>
          <a v-on:click="eliminarArticulo(articulo._id)" class="btn btn-delete">Eliminar</a>
          <a v-on:click="comprarArticulo(articulo.title)" class="btn btn-success" style="text-align: center; color: white; ">Comprar</a>
        </article>
      </section>
      <Sidebar />
      <div class="clearfix"></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Footer from "../components/Footer.vue";

//importar la libreria de axios para realizar peticiones HTTP en vue al node
import axios from "axios";

//importar la ruta global
import Global from "../Global";

//importar la libreria de alertas "sweetalert"
import SweetAlert from "sweetalert";

export default {
  name: "DetalleArticulo",
  components: {
    Header,
    Sidebar,
    Footer,
  },
  mounted() {
    //recoger el dato que llega por la URL
    this.id = this.$route.params.id;
    this.getArticulo(this.id);
  },
  data() {
    return {
      articulo: [],
      url: Global.url,
      id: null,
    };
  },
  methods: {
    getArticulo(id) {
      axios.get(this.url + "buscarArticulo/" + id).then((res) => {
        if (res.data.status == "exitosa") {
          this.articulo = res.data.articulo;
          console.log(this.articulo);
        }
      });
    },
    eliminarArticulo(id) {
      SweetAlert({
        title: "¿Estas seguro que deseas borrar el Artículo?",
        text: "¡Una vez eliminado no podrá recuperarse!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(this.url + "eliminarArticulo/" + id).then((res) => {
            if (res.data.status == "exitosa") {
              SweetAlert("Articulo Eliminado", "El articulo fue eliminado correctamente", "success");
            } else {
              SweetAlert("Fallo la Eliminación", "El articulo NO fue eliminado ... verifique ", "error");
            }
            this.$router.push("/blog");
          });
        }
      });
    },

    // Comprar artículo
    comprarArticulo(nombre) {
      swal("Ingresa el precio del articulo:", {
        content: "input",
      }).then((result) => {
        swal("Ingresa la cantidad de articulos:", {
          content: "input",
        }).then((cantidad_productos) => {
          axios.get(this.url + "comprar/" + nombre + "/" + cantidad_productos + "/" + result).then((res) => {
            if (res.data.status == "Completado") {
              this.articulo = res.data.articulo;
              console.log(this.articulo);
              swal("Compra Realizada", "¡Genial!" + " Ingresaste " + cantidad_productos + " " + nombre + "  ($" + result + " C/U)" + "\n Compra realizada", "success");             
              setTimeout(() => { window.location.href = "/compras" }, 1500);
              
            }
          });
        });
      });
    },
  },
};
</script>
