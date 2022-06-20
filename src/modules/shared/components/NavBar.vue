<template>
  <div>
    <router-link to="/">Registro</router-link>
    <router-link to="/Lista-usuarios">Usuarios</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
   
    
    div{
        widows: 100%;
        padding: 20px 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 1px 10px 1px rgb(125,170,224,0.3);
    }

    div a{
        font-weight: bold;
        color: #2c3e50;
        margin: 0 10px;
        text-decoration: none;
    }

    div .router-link-exact-active{
        color: #42b983;
        transition: all 0.5s ease;

    }

</style>