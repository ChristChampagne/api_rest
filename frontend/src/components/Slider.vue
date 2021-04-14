<template>
  <!-- <div id="slider" class="slider-big"> -->
    <!-- aplicar una clase condicional -->
  <div id="slider" :class="{
    'slider-big':index,
    'slider-small':!index
  }">
    <!-- <h1>Bienvenido al Curso de Vue JS</h1> -->
     <h1>{{texto}}</h1>
    <!-- <a href="#" class="btn-white" >Ir al blog</a> -->
    <router-link to="/blog" class="btn-white" v-if="index">Ir al blog</router-link>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props:['texto','index']
};
</script>