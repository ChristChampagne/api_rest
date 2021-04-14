<template>
  <h1>Redireccion</h1>
</template>

<script>
export default {
  name: "Redireccion",
  //metodo del ciclo de vida de los componentes
  mounted(){
    var cadena=this.$route.params.cadena;
    this.$router.push("/consulta/" + cadena);
  }
};
</script>