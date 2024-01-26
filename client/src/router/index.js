import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () =>import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home/Home.vue'),
      },
      {
        path: '/lost',
        name: 'Lost',
        component: () => import('../views/lost_page/index.vue')
      },
      {
        path: '/found',
        name: 'Found',
        component: () => import('../views/found_page/index.vue'),
      },
      {
        path: '/publish',
        name: 'Publish',
        component: () => import('../views/publish/index.vue'),
      },
      {
        path: '/hot',
        name: 'Hot',
        component: () => import('../views/hot/index.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
