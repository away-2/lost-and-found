import {
  createRouter,
  createWebHistory
} from 'vue-router';

const routes = [
  // {
  //   path: '/',
  //   redirect: '/login',
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
  },
  {
    path: '/updatePwd',
    name: 'UpdatePwd',
    component: () => import('../views/login/components/updatePwd.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [{
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
        redirect: '/hot/new',
        component: () => import('../views/hot/index.vue'),
        children: [{
            path: 'new',
            name: 'New',
            component: () => import('../views/hot/components/newHotTopic.vue')
          },
          {
            path: 'popular',
            name: 'Popular',
            component: () => import('../views/hot/components/popularHotTopic.vue')
          },
          {
            path: 'concern',
            name: 'Concern',
            component: () => import('../views/hot/components/concernHotTopic.vue')
          }
        ]

      },
      {
        path: `/hot/:id`,
        name: 'hotInfo',
        component: () => import('../views/hot/components/hotInfo.vue')
      },
      {
        path: '/user/:id',
        name: 'User',
        component: () => import('../views/user/index.vue'),
        children: [{
            path: '',
            name: 'Dynamic',
            component: () => import('../views/user/components/dynamic.vue')
          },
          {
            path: 'like',
            name: 'Like',
            component: () => import('../views/user/components/like.vue')
          },
          {
            path: 'collect',
            name: 'Collect',
            component: () => import('../views/user/components/collect.vue')
          },
          {
            path: 'founds',
            name: 'Founds',
            component: () => import('../views/user/components/found.vue')
          },
          {
            path: 'losts',
            name: 'Losts',
            component: () => import('../views/user/components/lost.vue')
          },
          {
            path: 'following',
            name: 'Following',
            component: () => import('../views/user/components/following.vue')
          },
          {
            path: 'like',
            name: 'Like',
            component: () => import('../views/user/components/like.vue')
          },
          {
            path: 'topic',
            name: 'Topic',
            component: () => import('../views/user/components/topic.vue')
          },
        ]
      },
      {
        path: '/setting',
        name: 'Setting',
        redirect: '/setting/prefile',
        component: () => import('../views/setting/index.vue'),
        children: [
          {
            path: 'prefile', 
            name: 'Prefile',
            component: () => import('../views/setting/components/prefile.vue')
          },
           {
            path: 'account', 
            name: 'Account',
            component: () => import('../views/setting/components/account.vue')
           }
        ]
      }, 
      {
        path: '/notification',
        name: 'Notification',
        component: () => import('../views/notification/index.vue'),
        children: [
          {
            
          }
        ]
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router