<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <SendMail />
  <ListaUsuarios />
</template>

<script>
import SendMail from "@/components/SendMail"
import ListaUsuarios from "@/components/ListaUsuarios"

export default {
  name: 'App',
  components: {
    ListaUsuarios,
    SendMail
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
