import { defineStore } from 'pinia'
import { db } from '@/firebase/firebase'
import { deleteDoc, doc } from 'firebase/firestore'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useDelUserStore = defineStore('delUser', () => {
  const delUser = async (id: string) => {
    await deleteDoc(doc(db, 'users', id)).then(() => {
      toast.success(`User ID:"${id}" has been deleted successfully`)
    })
  }

  return { delUser }
})
