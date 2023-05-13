<template>
  <div class="contenedor-data">
    <div class="nombre">
      <h3>Nombre</h3>
      <div v-for="usuario in usuarios" :key="usuario.id" class="informacion">
        {{ usuario.name }}
      </div>
    </div>
    <div class="correos">
      <h3>Email</h3>
      <div v-for="usuario in usuarios" :key="usuario.id" class="informacion">
        {{ usuario.email }}
      </div>
    </div>

    <div class="rut">
      <h3>Rut</h3>
      <div v-for="usuario in usuarios" :key="usuario.id" class="informacion">
        {{ usuario.rut }}
      </div>
    </div>
  </div>
</template>

<script>
  import getListaUsuarios from '../helpers/consultaApi';

  export default {
    data() {
      return {
        usuarios: [],
      };
    },

    methods: {
      async crearLista() {
        let arrayPrueba;
        arrayPrueba = await getListaUsuarios();
        this.usuarios = arrayPrueba.data;
      },
    },
    mounted() {
      this.crearLista();
    },
  };
</script>

<style>
  .contenedor-data {
    margin: 0px auto;
    max-width: 700px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: auto;
    text-align: center;
    border-radius: 5px;
    background-color: #fff;
    width: 100%;
    box-shadow: 0px 5px 10px 1px rgb(125, 170, 224, 0.3);
    overflow: hidden;
  }

  .contenedor-data h3 {
    padding: 10px 20px;
    background: #45a049;
    color: white;
  }

  .informacion {
    padding: 10px 20px;
  }

  .informacion:nth-child(odd) {
    background: rgba(204, 204, 204, 0.26);
  }
</style>
