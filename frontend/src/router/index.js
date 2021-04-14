import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Index from "../views/Index.vue";
import ErrorComponente from "../components/ErrorComponente.vue";
import Vuemoment from "vue-moment";
import moment from "moment";
import "moment/locale/es";
import Consulta from "../views/Consulta.vue";
import Consulta2 from "../views/Consulta2.vue";
import DetalleArticulo from "../views/DetalleArticulo.vue";
import CrearArticulo from "../views/CrearArticulo.vue";
import EditarArticulo from "../views/EditarArticulo.vue";
import Compras from "../views/Compras.vue";
import CrearCompra from "../views/CrearCompra.vue";


//cargar el componenete de Redireccion

import Redireccion from "../components/Redireccion.vue";

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(Vuemoment, { moment });

const routes = [
    { path: "/", name: "Index", component: Index },
    { path: "/index", name: "Index2", component: Index },
    {
        path: "/blog",
        name: "Blog",
        component: () =>
            import ("../views/Blog.vue"),
    },
    {
        path: "/formularios",
        name: "Formularios",
        component: () =>
            import ("../views/Formularios.vue"),
    },
    {
        path: "/pagina1/:id?",
        name: "Pagina1",
        component: () =>
            import ("../views/Pagina.vue"),
    },
    {
        path: "/pagina2",
        name: "Pagina2",
        component: () =>
            import ("../views/Pagina.vue"),
    },
    { path: "*", name: "Error", component: ErrorComponente },
    { path: "/consulta/:cadena", name: "Consulta", component: Consulta },
    { path: "/redireccion/:cadena", name: "Redireccion", component: Redireccion },
    { path: "/articulo/:id", name: "Articulo", component: DetalleArticulo },
    { path: "/creararticulo", name: "CrearArticulo", component: CrearArticulo },
    { path: "/editararticulo/:id", name: "EditarArticulo", component: EditarArticulo },
    { path: "/consultaCompra/:cadena", name: "Consulta2", component: Consulta2 },


    // Crear compra
    { path: "/compras", name: "Compras", component: Compras },
    { path: "/crearCompra", name: "CrearCompra", component: CrearCompra },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;