<template>
  <section id="content">
    <h1 class="subheader">Formulario</h1>

    <form class="mid-form" @submit.prevent="mostrarUsuario()">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" name="nombre" v-model="user.nombre" />
        <div v-if="submitted && !$v.user.nombre.required">Este Campo es requerido</div>
        <div v-if="submitted && !$v.user.nombre.minLength">Este Campo debe tener al menos 2 caracteres</div>
      </div>

      <div class="form-group">
        <label for="apellidos">Apellidos</label>
        <input type="text" name="apellidos" v-model="user.apellidos" />
        <div v-if="submitted && !$v.user.apellidos.required">Este Campo es requerido</div>
        <div v-if="submitted && !$v.user.apellidos.minLength">Este Campo debe tener al menos 2 caracteres</div>
      </div>

      <div class="form-group">
        <label for="bio">Biografia</label>
        <textarea name="bio" v-model="user.bio"></textarea>
        <div v-if="submitted && !$v.user.bio.required">Este Campo es requerido</div>
        <div v-if="submitted && !$v.user.bio.minLength">Este Campo debe tener al menos 10 caracteres</div>
      </div>

      <div class="form-group radibuttons">
        <input
          type="radio"
          name="genero"
          value="hombre"
          checked
          v-model="user.genero"
        />
        Hombre
        <input type="radio" name="genero" value="mujer" v-model="user.genero" />
        Mujer
        <input type="radio" name="genero" value="otro" v-model="user.genero" />
        Otro
      </div>

      <div class="clearfix"></div>

      <input type="submit" value="Enviar" class="btn btn-success" />
    </form>
  </section>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Formulario",
  validations: {
    user: {
      nombre: {
        required,
        minLength: minLength(2),
      },
      apellidos: {
        required,
        minLength: minLength(2),
      },
      bio: {
        required,
        minLength: minLength(10),
      },
    },
  },
  data() {
    return {
      submitted: false,
      user: {
        nombre: "",
        apellidos: "",
        bio: "",
        genero: "",
      },
    };
  },
  methods: {
    mostrarUsuario() {
      console.log(this.user);
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }

      alert("Validacion Correcta");
    },
  },
};
</script>