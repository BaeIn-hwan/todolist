import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '@/views/TodoList.vue'
import TodoDetail from '@/views/TodoDetail.vue'
import TodoWrite from '@/views/TodoWrite.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: '/TodoList',
  },
  {
    path: '/TodoList',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/TodoDetail/:id',
    name: 'TodoDetail',
    component: TodoDetail
  },
  {
    path: '/TodoWrite',
    name: 'TodoWrite',
    component: TodoWrite
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
