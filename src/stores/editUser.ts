import { defineStore } from 'pinia'
import { db } from '@/firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'

export const useEditUserStore = defineStore('editUser', () => {
  const editUser = async (id: string, username: string, password: string, role: string) => {
    const userRef = doc(db, 'users', id)
    const user = {
      username: username,
      password: password,
      role: role
    }
    await setDoc(userRef, user)
  }

  return { editUser }
})
