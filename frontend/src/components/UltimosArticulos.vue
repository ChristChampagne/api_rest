<template>
  <section id="content">
    <h2 class="subheader">Últimos artículos</h2>

    <!--Listado articulos-->
    <div id="articles" v-if="articulos && articulos.length >= 1">
      <Articulos :articulos="articulos"/>
    </div>
   <div id="articles" v-else>
      <h2>.:: No hay articulos para Mostrar ::. </h2>
   </div> 
  </section>
</template>

<script>
import Articulos from "../components/Articulos.vue";

//importar la libreria de axios para realizar peticiones HTTP en vue al node
import axios from "axios";

//importar la ruta global
import Global from "../Global";

export default {
  name: "UltimosArticulos",
  components: {
    Articulos,
  },
  mounted() {
    this.getUltimosArticulos();
  },
  data() {
    return {
      articulos: [],
      url: Global.url,
    };
  },
  methods: {
    getUltimosArticulos() {
      axios.get(this.url + "buscarArticulos/true").then((res) => {
        if (res.data.status == "exitosa") {
          this.articulos = res.data.articulos;
          console.log(this.articulos);
        }
      });
    },
  },
};
</script>