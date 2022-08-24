import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import Dashboard from '../views/Dashboard.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:{name:'login'}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component:Dashboard
    }
  ]
})

export default router
