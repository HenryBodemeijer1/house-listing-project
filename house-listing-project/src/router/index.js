import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HousesIndexView from '@/views/houses/IndexView.vue'
import HouseCreateView from '../views/houses/CreateView.vue'
import HouseEditView from '../views/houses/EditView.vue'
import HouseShowView from '../views/houses/ShowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'houses.index',
      component: HousesIndexView
    },
    {
      path: '/houses/create',
      name: 'houses.create',
      component: HouseCreateView
    },
    {
      path: '/houses/:id/edit',
      name: 'houses.edit',
      component: HouseEditView
    },
    {
      path: '/house/:id',
      name: 'houses.show',
      component: HouseShowView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
  ]
})

export default router