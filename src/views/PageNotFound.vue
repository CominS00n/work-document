<template>
  <div class="h-svh w-svw flex flex-col justify-center items-center">
    <h1 class="text-2xl">404</h1>
    <div class="flex flex-col items-center">
      <p>Page not found</p>
      <v-btn @click="goBack" class="w-fit"><box-icon name="left-arrow-alt"></box-icon></v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/').then(() => {
    window.location.reload()
  })
}
</script>
