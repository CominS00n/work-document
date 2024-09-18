import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'

import type { UserData } from '@/interface/interface'

export const useUserStore = defineStore('userData', () => {
  const getUserData = async () => {
    const userData = ref<UserData[]>([])
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach((doc) => {
      const user = {
        id: doc.id,
        username: doc.get('username'),
        password: doc.get('password'),
        role: doc.get('role')
      }
      userData.value.push(user)
    })
    return userData.value
  }

  return { getUserData }
})
