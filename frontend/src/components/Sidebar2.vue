<template>
  <aside id="sidebar">
    <div id="nav-blog" class="sidebar-item">

    </div>

    <div id="search" class="sidebar-item">
      <h3>Compras</h3>
      <p>Encuentra la compra que buscas</p>
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
  name: "Sidebar2",
  data() {
    return {
      cadena: null,
    };
  },
  methods: {
    consulta() {
      //console.log(this.cadena);
      //Se realizara una redireccion al componente de "Consulta2.vue"
      this.$router.push("consultaCompra/" + this.cadena);
    },
  },
};
</script>