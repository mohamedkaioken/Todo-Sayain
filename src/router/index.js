import Vue from 'vue'
import VueRouter from 'vue-router'
import Dash from '../views/Dashboard.vue'
import Project from '../views/Projects.vue'
import Team from '../views/Teams.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dash',
    component: Dash
  },
  {
    path: '/projects',
    name: 'Project',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Project
  },
  {
    path: '/teams',
    name: 'Team',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Team
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
