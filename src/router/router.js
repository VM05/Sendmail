import {createRouter, createWebHashHistory} from 'vue-router'



const routes = [
    {
        path: '/',
         component:()=> import(/*webpackChunkName: "Home" */ '@/modules/Send/pages/Registro')
    },
    {
        path: '/lista-usuarios',
         component: ()=> import(/*webpackChunkName: "Listas" */ '@/modules/Send/pages/Listas')
    }

]


const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })


  export default router