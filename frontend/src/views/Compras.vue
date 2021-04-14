<template>
  <div class="blog">
    <Header />
    <Slider texto="Sección de Compras" />
    <div class="center">
      <section id="content">
         <h1 class="subheader" v-if="compras && compras.length >= 1">Todas las compras</h1>

         <div id="compras" v-if="compras && compras.length >= 1">
            <Compra2 :compras="compras"/>
        </div>


      </section>
      <Sidebar2 />
      <div class="clearfix"></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Sidebar2 from "../components/Sidebar2.vue";

import Slider from "../components/Slider.vue";
import Footer from "../components/Footer.vue";

import Compra2 from "../components/Compras.vue";

import axios from "axios";

//importar la ruta global
import Global from "../Global";


export default {
  name: "Compra",
  components: {
    Header,
    Sidebar,
    Footer,
    Slider,
    Sidebar2,
    Compra2,
  },
  mounted() {
    this.getCompras();
  },
    data() {
    return {
      compras : [],
      url: Global.url
    };
  },
  methods: {
    getCompras() {
      axios.get(this.url + "buscarCompras").then((res) => {
        if (res.data.status == "Compra encontrada") {
          this.compras = res.data.compra;
          console.log(this.compras);
        }
      });
    },
  },
};
</script>
