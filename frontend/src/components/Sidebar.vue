<template>
  <aside id="sidebar">
    <div id="nav-blog" class="sidebar-item">
      <h3>Puedes hacer esto</h3>
      <!-- <a href="#" class="btn btn-success">Crear artículo</a> -->
      <router-link to="/creararticulo" class="btn btn-success">Crear artículo</router-link>
    </div>

    <div id="search" class="sidebar-item">
      <h3>Buscador</h3>
      <p>Encuentra el artículo que buscas</p>
      <!-- <form @submit.prevent="consulta"> -->
      <form v-on:submit.prevent="consulta">
        <!-- vincular nuestro evento y asociar el input search con v-model="cadena"-->
        <input type="text" name="search" v-model="cadena" />
        <input type="submit" name="submit" value="Buscar" class="btn" />
      </form>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      cadena: null,
    };
  },
  methods: {
    consulta() {
      //console.log(this.cadena);
      //Se realizara una redireccion al componente de "Consulta.vue"
      this.$router.push("/redireccion/" + this.cadena);
    },
  },
};
</script>