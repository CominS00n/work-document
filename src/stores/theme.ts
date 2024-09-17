import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChangeThemeStore = defineStore('changeTheme', () => {
  const theme = ref<string>('light')
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { theme, toggleTheme }
})
