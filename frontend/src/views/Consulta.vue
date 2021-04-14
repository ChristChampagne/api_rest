<template>
  <div class="blog">
    <Header />
    <Slider :texto="'Consulta de: '+cadena" />
    <div class="center">
      <section id="content">
        <h1 class="subheader" v-if="articulos && articulos.length >= 1">Articulos Encontrados</h1>
        <h1 class="subheader" v-else>Sin resultados </h1>
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
import Footer from "../components/Footer.vue";

//importar la libreria de axios para realizar peticiones HTTP en vue al node
import axios from "axios";

//importar la ruta global
import Global from "../Global";

//importar el componenete de articulos
import Articulos from "../components/Articulos.vue";

export default {
  name: "Consulta",
  components: {
    Header,
    Slider,
    Sidebar,
    Footer,
    Articulos,
  },
  mounted() {
     //recoger el dato que llega por la URL
    this.cadena=this.$route.params.cadena; 
    this.getArticulosConsultados(this.cadena);
  },
  data() {
    return {
      articulos: [],
      url: Global.url,
      cadena:null,
    };
  },
  methods: {
    getArticulosConsultados(cadena) {
      axios.get(this.url + "consultaArticulos/"+cadena).then((res) => {
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