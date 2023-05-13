import axios from 'axios';

const getListaUsuarios = async () => {
  return await axios.get('https://register-users-cae06-default-rtdb.firebaseio.com/users.json');
};

export default getListaUsuarios;
