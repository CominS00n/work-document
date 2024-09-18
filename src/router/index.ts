import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/MainView.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        alias: '/',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/webapp/:id/:title',
        name: 'webapp',
        component: () => import('../views/ProjectDetail.vue'),
        meta: {
          requiresAuth: true,
          role: 'user'
        }
      },
      {
        path: '/api/:id/:title',
        name: 'api',
        component: () => import('../views/ProjectDetail.vue'),
        meta: {
          requiresAuth: true,
          role: 'user'
        }
      },
      {
        path: '/script/:id/:title',
        name: 'script',
        component: () => import('../views/ProjectDetail.vue'),
        meta: {
          requiresAuth: true,
          role: 'user'
        }
      },
      {
        path: '/crontab/:id/:title',
        name: 'crontab',
        component: () => import('../views/ProjectDetail.vue'),
        meta: {
          requiresAuth: true,
          role: 'user'
        }
      },
      {
        path: '/manage',
        name: 'manage',
        components: {
          default: () => import('../views/InsertData.vue')
        },
        meta: {
          requiresAuth: true,
          role: 'user'
        }
      },
      {
        path: '/super-admin',
        name: 'super-admin',
        meta: {
          requiresAuth: true,
          role: 'super-admin'
        },
        children: [
          {
            path: ':id/register',
            name: 'register',
            component: () => import('../views/RegisterPage.vue')
          },
        ],
        beforeEnter: (to: any, from: any) => {
          if (localStorage.getItem('role') !== 'super-admin') {
            return { name: 'login', query: { redirect: to.fullPath } }
          }
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: () => import('../views/LoginPage.vue')
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/PageNotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !window.name && to.meta.role !== localStorage.getItem('role')) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
