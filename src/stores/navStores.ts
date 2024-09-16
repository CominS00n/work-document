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
  const navList = ref<NavData[]>([])
  const getNavList = async () => {
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
        submenus: []
      },
      {
        title: 'Web App',
        icon: 'web',
        link: '/web-app',
        submenus: navList.value.filter((item) => item.type === 'Web App')
      },
      {
        title: 'API',
        link: '/api',
        icon: 'http',
        submenus: navList.value.filter((item) => item.type === 'API')
      },
      {
        title: 'Scripts',
        link: '/scripts',
        icon: 'code',
        submenus: navList.value.filter((item) => item.type === 'Scripts')
      },
      {
        title: 'Crontab',
        link: '/crontab',
        icon: 'manage_history',
        submenus: navList.value.filter((item) => item.type === 'Crontab')
      },
      {
        title: 'Manage',
        link: '/manage',
        icon: 'edit_note',
        submenus: []
      }
    ]
    return menuItems
  }
  return { navList, getNavList }
})

// {
//     title: 'Home',
//     link: '/home',
//     icon: 'home',
//     submenus: []
//   },
//   {
//     title: 'Web App',
//     icon: 'web',
//     link: '/web-app',
//     submenus: navList.value.filter((item) => item.type === 'Web App')
//   },
//   {
//     title: 'API',
//     link: '/api',
//     icon: 'http',
//     submenus: [
//       {
//         id: 1,
//         title: 'Django'
//       }
//     ]
//   },
//   {
//     title: 'Scripts',
//     link: '/scripts',
//     icon: 'code',
//     submenus: []
//   },
//   {
//     title: 'Crontab',
//     link: '/crontab',
//     icon: 'manage_history',
//     submenus: []
//   },
//   {
//     title: 'Manage',
//     link: '/manage',
//     icon: 'edit_note',
//     submenus: []
//   }
