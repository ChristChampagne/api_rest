<template>
    <div class="Pagina">
       <Header />
       <PaginaPruebas />
    </div>
</template>

<script>

import Header from '../components/Header.vue'
import PaginaPruebas from '../components/PaginaPruebas.vue'

export default {
    name:'Pagina',
    components:{
        Header,
        PaginaPruebas
    }
}
</script>