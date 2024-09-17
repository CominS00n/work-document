import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'
import type { RegisterData } from '@/interface/interface'
import { useToast } from 'vue-toastification'

const toast = useToast()

const addUsers = async (data: RegisterData) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      username: data.username,
      password: data.password,
      role: data.role
    })
    console.log('Document written with ID: ', docRef.id)
    toast.success('User added successfully')
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export { addUsers }
