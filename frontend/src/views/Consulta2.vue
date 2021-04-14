<template>
  <div class="blog">
    <Header />
    <Slider :texto="'Consulta de: '+cadena" />
    <div class="center">
      <section id="content">
        <h1 class="subheader" v-if="compras && compras.length >= 1">Compras Encontrados</h1>
        <h1 class="subheader" v-else>Sin resultados </h1>
        <!--Listado compras-->
        <div id="articles" v-if="compras && compras.length >= 1">
          <Compra2 :compras="compras" />
        </div>
        <div id="compras" v-else>
          <h2>.:: No hay compras para mostrar</h2>
        </div>
      </section>
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

import Compra2 from "../components/Compras.vue";

import axios from "axios";
import Global from "../Global";
import Articulos from "../components/Articulos.vue";



export default {
  name: "Consulta2",
  components: {
    Header,
    Slider,
    Sidebar,
    Footer,
    Articulos,
    Compra2,
  },
  mounted() {
     //recoger el dato que llega por la URL
    this.cadena=this.$route.params.cadena; 
    this.getCompras(this.cadena);
  },
  data() {
    return {
      compras: [],
      url: Global.url,
      cadena:null,
    };
  },
  methods: {
    getCompras(cadena) {
      axios.get(this.url + "consultaCompra/"+cadena).then((res) => {
        if (res.data.status == "exitosa") {
          this.compras = res.data.compras;
          console.log(this.compras);
        }
      }); 
    },
  },
};
</script>