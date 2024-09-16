<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div v-if="projectData">
          <h1 class="font-bold text-xl">
            {{ projectData.name }}
          </h1>
          <div class="space-x-2">
            <v-chip size="x-small">{{ projectData.type }}</v-chip>
            <v-chip size="x-small">{{ projectData.language }}</v-chip>
            <v-chip size="x-small">{{ projectData.status }}</v-chip>
          </div>
          <p class="text-sm">{{ projectData.detail }}</p>
          <v-card>
            <v-card-title> More Details </v-card-title>
            <v-card-text :class="role !== 'admin' ? 'text-black bg-black' : ''">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia sint velit voluptatem
                quaerat pariatur itaque! Autem alias quis magni unde numquam. Praesentium recusandae
                neque unde fugit, cumque quia atque quasi dolorum accusantium quae, aliquid officia
                eligendi ipsa repellat dolore, dicta saepe. Nam asperiores, culpa voluptas vero quia
                corporis obcaecati facilis!
              </p>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '@/firebase/firebase'
import { getDocs, collection } from 'firebase/firestore'
import type { ProjectData } from '@/interface/interface'

const route = useRoute()
const role = ref<string>('admin')

const projectData = ref<ProjectData>()
const getProjects = async () => {
  const querySnapshot = await getDocs(collection(db, 'working'))
  querySnapshot.forEach((doc) => {
    if (doc.id === route.params.id) {
      projectData.value = doc.data() as ProjectData
    }
  })
}

onMounted(() => {
  getProjects()
})

watch(route, () => {
  getProjects()
})
</script>
