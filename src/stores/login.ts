import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { db } from '@/firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useToast } from 'vue-toastification'
import type { UserData } from '@/interface/interface'

import sha256 from 'crypto-js/sha256'

const toast = useToast()

export const useLoginStore = defineStore('login', () => {
  const route = useRoute()
  const router = useRouter()
  const login = async (username: string, password: string) => {
    const users = ref<UserData[]>([])
    const querySnapshot = await getDocs(collection(db, 'users'))
    await querySnapshot.forEach((doc) => {
      users.value.push(doc.data() as UserData)
    })
    const selectedUser = async () => {
      return users.value.find((user) => user.username === username)
    }
    const user = await selectedUser()
    if (!user) {
      toast.error('User or Password is incorrect', { timeout: 2000 })
    }
    if (user && user.password === sha256(password).toString()) {
      localStorage.setItem('username', user.username)
      localStorage.setItem('role', user.role)
      window.name = user.username
      if (route.query.redirect) {
        router.push({ path: route.query.redirect as string })
        toast.success('Login Success', { timeout: 2000 })
      } else {
        router.push({ name: 'home' })
        toast.success('Login Success', { timeout: 2000 })
      }
    } else if (user && user.password !== sha256(password).toString()) {
      toast.error('User or Password is incorrect', { timeout: 2000 })
    }
  }

  const logout = () => {
    window.name = ''
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    router.push({ name: 'home', query: { logout: null } }).then(() => {
      location.reload()
    })
  }
  return { login, logout }
})
