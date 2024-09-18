import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'

interface NavData {
  id: string
  type: string
  name: string
}

export const useNavStore = defineStore('nav', () => {
  const getNavList = async () => {
    const navList = ref<NavData[]>([])
    const querySnapshot = await getDocs(collection(db, 'working'))
    querySnapshot.forEach((doc) => {
      const navItem = {
        id: doc.id,
        type: doc.get('type') as string,
        name: doc.get('name') as string
      }
      navList.value.push(navItem)
    })
    const menuItems = [
      {
        title: 'Home',
        link: '/home',
        icon: 'home',
        submenus: [],
        role: 'user'
      },
      {
        title: 'Web App',
        icon: 'web',
        link: '/webapp',
        submenus: navList.value.filter((item) => item.type === 'Web App'),
        role: 'user'
      },
      {
        title: 'API',
        link: '/api',
        icon: 'http',
        submenus: navList.value.filter((item) => item.type === 'API'),
        role: 'user'
      },
      {
        title: 'Scripts',
        link: '/script',
        icon: 'code',
        submenus: navList.value.filter((item) => item.type === 'Script'),
        role: 'user'
      },
      {
        title: 'Crontab',
        link: '/crontab',
        icon: 'manage_history',
        submenus: navList.value.filter((item) => item.type === 'Crontab'),
        role: 'user'
      },
      {
        title: 'Manage',
        link: '/manage',
        icon: 'edit_note',
        submenus: [],
        role: 'admin'
      },
      {
        title: 'Super Admin',
        link: '/super-admin',
        icon: 'admin_panel_settings',
        submenus: [
          {
            id: 'register',
            type: 'setting',
            name: 'register'
          },
          {
            id: 'usermanage',
            type: 'setting',
            name: 'usermanage'
          }
        ],
        role: 'super-admin'
      }
    ]
    return menuItems
  }
  return { getNavList }
})
