<template>
  <div class="blog">
    <Header />
    <Slider texto="Blog" />
    <div class="center">
      <section id="content">
        <h1 class="subheader">Blog</h1>
        <!--Listado articulos-->
        <div id="articles" v-if="articulos && articulos.length >= 1">
          <Articulos :articulos="articulos" />
        </div>
        <div id="articles" v-else>
          <h2>.:: No hay articulos para Mostrar ::.</h2>
        </div>
      </section>
      <Sidebar />
      <div class="clearfix"></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Slider from "../components/Slider.vue";
import Sidebar from "../components/Sidebar.vue";
import Sidebar2 from "../components/Sidebar.vue";

import Footer from "../components/Footer.vue";

//importar la libreria de axios para realizar peticiones HTTP en vue al node
import axios from "axios";

//importar la ruta global
import Global from "../Global";

//importar el componenete de articulos
import Articulos from "../components/Articulos.vue";

export default {
  name: "Blog",
  components: {
    Header,
    Slider,
    Sidebar,
    Footer,
    Articulos,
  },
  mounted() {
    //alert(Global.url);
    this.getArticulos();
  },
  data() {
    return {
      articulos: [],
      url: Global.url,
    };
  },
  methods: {
    getArticulos() {
      axios.get(this.url + "buscarArticulos").then((res) => {
        if (res.data.status == "exitosa") {
          this.articulos = res.data.articulos;
          console.log(this.articulos);
        }
        console.log(res);
      });
    },
  },
};
</script>
