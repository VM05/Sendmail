import getListaUsuarios from '@/helpers/consultaApi';
<template>
    <button></button>
    <li v-for="(usuario) in usuarios" :key="usuario">
        {{usuario}}
    </li>

</template>

<script>
 import getListaUsuarios from '../helpers/consultaApi'


export default {
  data(){
    return{
      usuarios:[]
    }
  },

  methods:{
    async crearLista(){
        this.usuarios = await getListaUsuarios()
        
    },
  },
  mounted(){
    this.crearLista()

  }
 
}
</script>

<style>

</style>