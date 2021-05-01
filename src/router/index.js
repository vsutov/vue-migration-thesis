import Vue from 'vue'
import VueRouter from 'vue-router'
import ChoresList from '../views/ChoresList'
import DeletedChoresList from '../views/DeletedChoresList'

Vue.use(VueRouter)

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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
