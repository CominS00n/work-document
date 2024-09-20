<template>
  <v-app :theme="changTheme.theme">
    <v-layout>
      <v-navigation-drawer class="side-bar">
        <v-list>
          <v-list-item title="Documentation">
            <template v-slot:append>
              <v-btn
                v-if="changTheme.theme === 'light'"
                @click="toggleTheme"
                icon="light_mode"
                size="small"
                variant="text"
                class="light-icon"
              ></v-btn>
              <v-btn
                v-else
                @click="toggleTheme"
                icon="dark_mode"
                size="small"
                variant="text"
                class="dark-icon"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item v-for="item in menuItems" :key="item.title">
            <v-list-item
              v-if="item.submenus.length === 0 && checkRole(item.role)"
              :prepend-icon="item.icon"
              :title="item.title"
              :value="item.title"
              :to="item.link"
            ></v-list-item>
            <v-list-group
              v-if="item.submenus.length !== 0 && checkRole(item.role)"
              :value="item.title"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :prepend-icon="item.icon"
                  :title="item.title"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="submenu in item.submenus"
                :key="submenu.name"
                :title="submenu.name"
                :value="submenu.name"
                :to="`${item.link}/${submenu.id}/${submenu.name}`"
              ></v-list-item>
            </v-list-group>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2" v-show="isButton()">
            <v-btn block @click="logout"> Logout </v-btn>
          </div>
          <div class="pa-2" v-show="!isButton()">
            <v-btn block :to="{ name: 'login' }"> Login </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main style="height: 100vh; overflow-y: auto">
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useChangeThemeStore } from '@/stores/theme'
import { useLoginStore } from '@/stores/login'
import { useNavStore } from '@/stores/navStores'
import { onMounted, ref } from 'vue'

const changTheme = useChangeThemeStore()
const toggleTheme = () => {
  changTheme.toggleTheme()
}

const { logout } = useLoginStore()

const { getNavList } = useNavStore()
const menuItems = ref<
  Array<{
    title: string
    icon: string
    link: string
    submenus: Array<{ id: string; type: string; name: string }>
    role: string
  }>
>([])

onMounted(async () => {
  await getNavList().then((res) => {
    menuItems.value = res
  })
})

const isButton = () => {
  if (!localStorage.getItem('username')) {
    return false
  } else {
    return true
  }
}

const checkRole = (role: string) => {
  if (role === 'user') return true
  if (role === 'admin' && localStorage.getItem('role') === 'admin') return true
  if (
    (role === 'super-admin' || role === 'admin') &&
    localStorage.getItem('role') === 'super-admin'
  )
    return true
}
</script>

<style lang="css">
.light-icon,
.dark-icon {
  animation: transform 0.5s ease;
}

@keyframes transform {
  0% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.side-bar::-webkit-scrollbar {
  display: none;
}

.side-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
