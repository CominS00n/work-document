import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebase/firebase'
import { getDocs, collection } from 'firebase/firestore'
import type { ProjectData } from '@/interface/interface'

export const useProjectDataStore = defineStore('projectData', () => {
  const getProjectData = async (id: string) => {
    const projectData = ref<ProjectData>()
    const file = ref<string>('')
    const querySnapshot = await getDocs(collection(db, 'working'))
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        projectData.value = doc.data() as ProjectData
        file.value = doc.get('readme')
      }
    })
    return { data: projectData.value, file: file.value }
  }

  const getAllProjectData = async () => {
    const allProjectData = ref<ProjectData[]>([])
    const querySnapshot = await getDocs(collection(db, 'working'))
    querySnapshot.forEach((doc) => {
      const docData = {
        id: doc.id,
        type: doc.get('type'),
        name: doc.get('name'),
        language: doc.get('language'),
        detail: doc.get('detail'),
        status: doc.get('status'),
        ip: doc.get('ip'),
        directory: doc.get('directory'),
        url: doc.get('url'),
        log: doc.get('log'),
        document: doc.get('document'),
        etc: doc.get('etc')
      }
      allProjectData.value.push(docData)
    })
    return allProjectData.value
  }

  return { getProjectData, getAllProjectData }
})
