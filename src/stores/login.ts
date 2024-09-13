import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

export const useLoginStore = defineStore('login', () => {
  const route = useRoute()
  const router = useRouter()
  const login = async (username: string, password: string) => {
    if (username === 'admin' && password === '12345678') {
      window.name = username
      const redirectPath = (route.query.redirect as string) || route.path
      router.push(redirectPath)
      return true
    }
    return false
  }

  const logout = () => {
    window.name = ''
    router.push({ name: 'home', query: { logout: null } })
  }
  return { login, logout }
})
