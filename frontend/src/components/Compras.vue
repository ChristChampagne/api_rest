<template>
  <div class="articulos_list">
    <article
      class="article-item"
      v-for="compra in compras"
      :key="compra._id"
    >
      <div style="display: flex; justify-content: space-between;">

     <div>
          <h2>CODIGO {{compra._id}}</h2>
        <h2>Nombre {{  compra.id_articulo }}</h2>
    
      <h2>Cantidad: {{ compra.cantidad }}</h2>
      <h2><strong>Precio total:</strong> ${{ compra.monto * compra.cantidad}}<sup><small style="text-muted">MXN</small></sup></h2>

      <span class="date"> {{ compra.date | moment("from","now") }} </span>
     </div>

       <div>
         <a href="#" v-on:click="eliminarCompra(compra._id)" type="button" style="color: #ffffff; background-color: rgb(192, 57, 43); padding: 1rem;"><strong>☓ </strong> Borrar compra  ➝</a>
         <a href="#"  v-on:click="editarCompra(compra._id, compra.cantidad, compra.monto)" type="button"  style= "color: #ffffff; padding: 1rem; background-color: rgb(52, 152, 219)" ><strong>☖ </strong> Editar compra  ➝</a>
           </div>
             </div>
      
      <div class="clearfix"></div>
    </article>
  </div>
</template>

<script>

//importar la ruta global
import Global from "../Global";
import SweetAlert from "sweetalert";
import axios from "axios";
export default {
  name: "Compra2",
  props: ["compras"],
  data(){
      return{
          url:Global.url
      }
  },
  methods:{
    eliminarCompra(id) {
      SweetAlert({
        title: "¿Estas seguro que deseas borrar la Compra?",
        text: "¡Una vez eliminado no podrá recuperarse!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(this.url + "eliminarCompra/" + id).then((res) => {
            if (res.data.status == "Compra Eliminada") {
              SweetAlert("Articulo Eliminado", "La compra fue eliminada correctamente", "success");
            } else {
              SweetAlert("Error al eliminar", "No se pudo eliminar ", "error");
            }
            this.$router.push("/compras");
          });
        }
      });
    },



      editarCompra(id, cantidad, monto) {
      swal("Ingresa el precio del articulo:", {
        content: "input",
      }).then((monto) => {
        console.log("PRECIO " + monto);
        swal("Ingresa la cantidad de articulos:", {
          content: "input",
        }).then((cantidad) => {
          console.log("CANTIDAD PRODUCTOS " + cantidad);
          axios.put(this.url + "actualizarCompra/" + id + "/" + cantidad + "/" + monto).then((res) => {
            if (res.data.status == "Compra Actualizada") {
              this.compraActualizada = res.data.compraActualizada;
              console.log(this.compraActualizada);
              swal("Edición Realizada", "¡Genial!" + " Ingresaste " + cantidad + "   ($" + monto + " C/U)" + "\n Modificación realizada", "success");             
              setTimeout(() => { window.location.href = "/compras" }, 1500);
              
            }
          });
        });
      });
    }
  }
};
</script>