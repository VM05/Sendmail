<template>
  <div class="container">
    <form @submit.prevent>
      <label>Name</label>
      <input type="text" v-model="name" name="user_name" placeholder="Nombre" />

      <label>Email</label>
      <input type="email" v-model="email" name="user_email" placeholder="Correo Electronico" />

      <label>RUT</label>
      <input
        type="text"
        v-model="rut"
        name="user_rut"
        placeholder="Ingrese su RUT"
        maxlength="12"
        @input="rutFormatter"
      />

      <input type="submit" value="Registrar" @click="submit" />
      <IsLoading v-if="isLoading" />
      <p v-if="alerts.Success" class="alert success">Usuario Creado</p>
      <p v-if="alerts.error" class="alert error">{{ alerts.error }}</p>
    </form>
  </div>
</template>

<script>
  import IsLoading from '@/components/IsLoading';
  import getListaUsuarios from '@/helpers/consultaApi';
  import emailjs from '@emailjs/browser';
  import dataApi from '@/helpers/dataApi';

  export default {
    name: 'SendMail',
    components: {
      IsLoading,
    },
    data() {
      return {
        name: '',
        email: '',
        rut: '',

        alerts: {
          Success: false,
          error: '',
        },
        isLoading: false,
      };
    },
    methods: {
      async submit() {
        const er =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.name === '' || this.email === '' || this.rut === '') {
          this.alerts.error = 'todos los campos son obligatorios';
          setTimeout(() => {
            this.alerts.error = '';
          }, 3000);
          return;
        }
        if (!er.test(this.email)) {
          this.alerts.error = 'Debe Ingresar un email valido';
          setTimeout(() => {
            this.alerts.error = '';
          }, 3000);
          return;
        }

        this.isLoading = true;
        let { data } = await getListaUsuarios();
        let entries = [];
        if (!data) {
          entries = [];
        }
        console.log(data);
        for (let id of Object.keys(data)) {
          entries.push({
            id,
            ...data[id],
          });
        }
        let checkEmail = entries.map((nombres) => nombres.email);
        if (checkEmail.includes(this.email)) {
          this.isLoading = false;
          this.alerts.error = 'El Correo Electronico ya esta siendo utilizado';
          setTimeout(() => {
            this.alerts.error = '';
          }, 3000);
          return;
        } else {
          let formData = new FormData();
          formData.append('name', this.name);
          formData.append('email', this.email);
          formData.append('rut', this.rut);
          const value = Object.fromEntries(formData.entries());
          try {
            const res = await dataApi.post('/users.json', value);
            this.isLoading = false;
            this.alerts.Success = true;
            setTimeout(() => {
              this.alerts.Success = false;
            }, 3000);
            this.enviarMail();
            console.log(res.data);
          } catch (error) {
            this.isLoading = false;
            console.log(error);
          }
        }
      },
      rutFormatter() {
        this.rut = this.rut.replace(/[^kK0-9\_]/g, '');
        if (this.rut.length > 1) {
          this.rut =
            this.rut.substring(0, this.rut.length - 1) +
            '-' +
            this.rut.substring(this.rut.length - 1, this.rut.length);
        }
        if (this.rut.length > 5) {
          this.rut =
            this.rut.substring(0, this.rut.length - 5) +
            '.' +
            this.rut.substring(this.rut.length - 5, this.rut.length);
        }
        if (this.rut.length > 9) {
          this.rut =
            this.rut.substring(0, this.rut.length - 9) +
            '.' +
            this.rut.substring(this.rut.length - 9, this.rut.length);
        }
      },

      enviarMail() {
        const formulario = document.querySelector('form');
        emailjs
          .sendForm('service_nxintto', 'template_bg9hxen', formulario, 'u3dYQ9aE_YOEkW79M')
          .then(
            (result) => {
              console.log('SUCCESS!', result.text);
            },
            (error) => {
              console.log('FAILED...', error.text);
            }
          );
      },
    },
  };
</script>

<style scoped>
  .container {
    display: block;
    margin: auto;
    text-align: center;
    border-radius: 5px;
    background-color: #fff;
    padding: 20px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0px 5px 10px 1px rgb(125, 170, 224, 0.3);
  }

  label {
    float: left;
  }

  input[type='text'],
  [type='email'] {
    width: 100%;
    padding: 12px;
    border: none;
    border-bottom: solid 1px rgb(125, 170, 224, 0.3);
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
    outline: none;
    transition: all 0.3s ease;
  }

  input[type='text']:focus,
  [type='email']:focus {
    border-bottom: solid 1px rgb(125, 170, 224, 1);
  }

  input[type='submit'] {
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 50px 0px 20px;
  }

  input[type='submit']:hover {
    background-color: #45a049;
  }

  .alert {
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }

  .error {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }

  .success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
</style>
