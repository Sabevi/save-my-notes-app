import { createRouter, createWebHistory } from 'vue-router'
import SaveMyNotesView from '../views/SaveMyNotesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SaveMyNotesView,
    }
  ]
})

export default router