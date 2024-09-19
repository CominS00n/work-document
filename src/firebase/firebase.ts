import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref as storageRef, uploadBytesResumable } from 'firebase/storage'
import type { ProjectData } from '@/interface/interface'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

const addProject = async (data: ProjectData, readme: string) => {
  const fileName = data.name + '.md'
  const storageReference = storageRef(storage, 'working/' + fileName)
  try {
    const markdownBlob = new Blob([readme], { type: 'text/markdown' })
    const uploadTask = uploadBytesResumable(storageReference, markdownBlob)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
    }),
      (error: any) => {
        console.error('Upload failed:', error)
      },
      () => {
        console.log('File uploaded successfully!')
      }
  } catch (e) {
    console.error('Error uploading file: ', e)
  }
  try {
    const docRef = await addDoc(collection(db, 'working'), {
      type: data.type,
      name: data.name,
      language: data.language,
      detail: data.detail,
      status: data.status,
      ip: data.ip,
      directory: data.directory,
      url: data.url,
      log: data.log,
      document: data.document,
      etc: data.etc,
      readme: storageReference.fullPath
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export { db, addProject, app }
