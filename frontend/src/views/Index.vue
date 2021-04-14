<template>
  <div class="index">
    <Header />
    <Slider texto="Bienvenido al Curso de Vue JS" index="true" />
     <div class="center">
       <UltimosArticulos />
       <Sidebar />
       <div class="clearfix"></div>
     </div>
     <Footer />
  </div>
</template>

<script>

import Header from '../components/Header.vue';
import Slider from '../components/Slider.vue';
import UltimosArticulos from '../components/UltimosArticulos.vue';
import Sidebar from '../components/Sidebar.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Index',
  components: {
    Header,
    Slider,
    UltimosArticulos,
    Sidebar,
    Footer
  }
}
</script>
