<template>
  <div class="formulario">
    <Header />
    <div class="center">
        <Formulario />
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
import Formulario from "../components/Formulario.vue";

export default {
  name: "Formularios",
  components: {
    Header,
    Sidebar,
    Footer,
    Formulario,
  }
  
};
</script>