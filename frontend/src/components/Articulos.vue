<template>
  <div class="articulos_list">
    <article
      class="article-item"
      v-for="articulo in articulos"
      :key="articulo._id"
    >
      <div class="image-wrap">
        <img
          :src="url + 'sacarImagen/' + articulo.image"
          :alt="articulo.title"
          v-if="articulo.image"
        />
        <img
          src="../assets/images/noimagen.jpeg"
          :alt="articulo.title"
          v-if="!articulo.image"
        />
      </div>

      <h2>{{ articulo.title }}</h2>
      <span class="date"> {{ articulo.date | moment("from","now") }} </span>
      <!-- <a href="#">Leer más</a> -->
      <router-link :to="{name:'Articulo', params:{id:articulo._id}}"> Leer más </router-link>


      <div class="clearfix"></div>
    </article>
  </div>
</template>

<script>

//importar la ruta global
import Global from "../Global";

export default {
  name: "Articulos",
  props: ["articulos"],
  data(){
      return{
          url:Global.url
      }
  }
};
</script>