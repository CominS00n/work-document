<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Current path: {{ route.params.id }} + {{ route.params.title }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
