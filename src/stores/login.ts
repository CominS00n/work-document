import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { db } from '@/firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'

import sha256 from 'crypto-js/sha256'

export const useLoginStore = defineStore('login', () => {
  const route = useRoute()
  const router = useRouter()
  const login = async (username: string, password: string) => {
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      if (doc.get('username') === username) {
        if (doc.get('password') === sha256(password).toString()) {
          window.name = doc.get('username')
          localStorage.setItem('username', doc.get('username'))
          localStorage.setItem('role', doc.get('role'))
          if (route.query.redirect) {
            router.push({ path: route.query.redirect as string }).then(() => {
              window.location.reload()
            })
          } else {
            router.push({ name: 'home' }).then(() => {
              window.location.reload()
            })
          }
        } else {
          console.log('User or password is not found')
        }
      } else {
        console.log('User or password is not found')
      }
    })
  }

  const logout = () => {
    window.name = ''
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    router.push({ name: 'home', query: { logout: null } }).then(() => {
      window.location.reload()
    })
  }
  return { login, logout }
})
