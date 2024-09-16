import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    alias: '/home'
  },
  {
    path: '/web-app/:id/:title',
    name: 'web-app',
    component: () => import('../views/ProjectDetail.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/api/:id/:title',
    name: 'api',
    component: () => import('../views/ProjectDetail.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: () => import('../views/LoginPage.vue')
    }
  },
  {
    path: '/manage',
    name: 'manage',
    components: {
      default: () => import('../views/InsertData.vue')
    },
    meta: {
      requiresAuth: true
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
  if (to.meta.requiresAuth && !window.name) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
