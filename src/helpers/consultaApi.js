import axios from 'axios'

const getListaUsuarios = async ()=>{
   return await axios.get('http://localhost:3000/users')
}


export default getListaUsuarios