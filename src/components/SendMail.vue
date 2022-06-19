import axios from 'axios';
import { data } from '@/helpers/dataApi';
<template>
    <div class="container">
        <form @submit.prevent>
          <label>Name</label>
          <input 
            type="text" 
            v-model="name"
            name="name"
            placeholder="Nombre"
          >
          <span v-if="!name">Debe ingresar un nombre</span>
          <p>{{name}}</p>
          <label>Email</label>
          <input 
            type="email" 
            v-model="email"
            name="email"
            placeholder="Correo Electronico"
            >
            <p>{{email}}</p>
          <label>Mensaje</label>
          <textarea 
            name="Mensaje"
            v-model="mensaje"
            cols="30" rows="5"
            placeholder="mensaje">
          </textarea>
          
          <input type="submit" value="Send" @click="submit">
          <IsLoading v-if="isLoading"/>
          <p v-if="alerts.Success" class="exito">Usuario Creado</p>
          <p v-if="alerts.error" class="error">El email ya existe</p>
        </form>
    </div>
</template>

<script>
import IsLoading from '@/components/IsLoading'
import axios from 'axios'
import getListaUsuarios from '@/helpers/consultaApi'

export default {
    name: 'SendMail',
     components:{
       IsLoading
    },
    data(){
        return{
          
                name: '',
                email: '',
                mensaje: '',
                
                alerts: {
                  Success: false,
                  error:false,
                },
                isLoading: false,
        }
    },
    methods:{
       async submit(){
            this.isLoading = true;
            let comparador = await getListaUsuarios()
            let checkEmail = comparador.data.map(nombres => nombres.email )
            if(checkEmail.includes(this.email)){
              console.log('el correo electronico ya esta siendo utilizado');
              return
            }else{
              let formData = new FormData();
              formData.append('name', this.name);
              formData.append('email', this.email);
              const value = Object.fromEntries(formData.entries());
            try {
              const res = await axios.post('http://localhost:3000/users', value)
              this.isLoading = false;
              this.alerts.Success = true
              setTimeout(() => {
              this.alerts.Success = false
              }, 3000);
              console.log(res.data)        
            } catch (error) {
                console.log(error)
            }
           }           
        }
    }
}



</script>

<style scoped>
* {box-sizing: border-box;}

.container {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
}

label {
  float: left;
}

input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}


</style>