import axios from 'axios';

const dataApi = axios.create({
  baseURL: 'https://register-users-cae06-default-rtdb.firebaseio.com',
});

export default dataApi;
