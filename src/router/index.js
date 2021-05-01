import { createRouter, createWebHistory } from 'vue-router'
import ChoresList from '../views/ChoresList'
import DeletedChoresList from '../views/DeletedChoresList'

const routes = [
  {
    path: '/',
    name: 'todo-list',
    component: ChoresList
  },
  {
    path: '/recycle-bin',
    name: 'recycle-bin',
    component: DeletedChoresList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
