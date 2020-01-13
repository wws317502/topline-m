import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    component: () => import('../views/tab-bar/index.vue'),
    children: [{
      path: '',
      component: () => import('../views/home/index.vue')
    }, {
      path: 'qa',
      component: () => import('../views/qa/index.vue')
    }, {
      path: 'my',
      component: () => import('../views/my/index.vue')
    }, {
      path: 'video',
      component: () => import('../views/video/index.vue')
    }]

  }
]

const router = new VueRouter({
  routes
})

export default router
