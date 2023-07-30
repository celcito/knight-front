import { createRouter, createWebHistory } from 'vue-router'
import KnightsList from '../views/KnightsList.vue';
import KnightForm from '../views/KnightForm.vue';
import KnightEdit from '../views/KnightEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: KnightsList, props: true
    },
    { path: '/knigts', component: KnightsList, props: true },
    { path: '/knigts/edit/:id', component: KnightEdit, props: true },
    { path: '/knigts/create', component: KnightForm },
    { path: '/knigts/:id', component: KnightForm },


  ]
})

export default router
