export const menuItems = [
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
    submenus: [
      {
        id: 1,
        title: 'Log'
      },
      {
        id: 2,
        title: 'Python'
      }
    ]
  },
  {
    title: 'API',
    link: '/api',
    icon: 'http',
    submenus: [
      {
        id: 1,
        title: 'Django'
      }
    ]
  },
  {
    title: 'Scripts',
    link: '/scripts',
    icon: 'code',
    submenus: []
  },
  {
    title: 'Crontab',
    link: '/crontab',
    icon: 'manage_history',
    submenus: []
  },
  {
    title: 'Manage',
    link: '/manage',
    icon: 'edit_note',
    submenus: []
  }
]
