<template>
  <section id="content">
    <h2 class="subheader">Pagina de Pruebas</h2>
    <h3>{{id_desde_url}}</h3>
    <hr>
    <h2>
      Reactividad
    </h2>
    <input type="text" v-model="nombre"/>
    Mi nombre es: <strong>{{nombre}}</strong>
    <hr><hr>
    <h2>Directivas condicionales IF</h2>
    <input type="number" v-model="edad"/><br>
    Mi edad es:<strong>{{edad}}</strong>

    <p style="color:green; font-weight:bold;" v-if="edad && edad>=18">
      Hola, soy mayor de edad
    </p>
    <p style="color:red; font-weight:bold;" v-else>
      Hola, soy menor de edad
    </p>

    <hr><hr>
    <h2>Directivas ITERATIVA FOR</h2>
    <ol>
      <li v-for="pelicula in peliculas" :key="pelicula">{{pelicula}}</li>
    </ol>
   

  </section>
</template>

<script>
export default {
  name: "PaginaPruebas",
  mounted(){
    this.id_desde_url=this.$route.params.id;
  },
  data(){
    return {
      id_desde_url: null,
      nombre:'',
      edad:'18',
      peliculas:['batman vs superman', 'Señor de los anillos I', 'Spider Man', 'Hulk I','Vengadores']
    }
    
  }
};
</script>