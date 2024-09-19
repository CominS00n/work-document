<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div v-if="projectData">
          <v-text class="font-bold text-2xl">{{ projectData.name }}</v-text>
          <v-subtitle
            ><div class="space-x-2">
              <v-chip
                size="x-small"
                :color="projectData.status === 'Production' ? 'success' : ''"
                >{{ projectData.status }}</v-chip
              >
              <v-chip size="x-small" color="secondary">{{ projectData.type }}</v-chip>
              <v-chip size="x-small" color="secondary">{{ projectData.language }}</v-chip>
            </div></v-subtitle
          >

          <p class="my-5">{{ projectData.detail }}</p>
          <v-card>
            <v-card-title> More Details </v-card-title>
            <v-card-text>
              <v-table>
                <tbody>
                  <tr>
                    <td>Server IP:</td>
                    <td>
                      <v-chip color="primary">{{ projectData.ip || 'None' }}</v-chip>
                    </td>
                  </tr>
                  <tr>
                    <td>Directory path:</td>
                    <td>
                      <v-chip color="primary">{{ projectData.directory || 'None' }}</v-chip>
                    </td>
                  </tr>
                  <tr>
                    <td>URL:</td>
                    <td>
                      <v-chip color="primary">{{ projectData.url || 'None' }}</v-chip>
                    </td>
                  </tr>
                  <tr>
                    <td>Log path:</td>
                    <td>
                      <v-chip color="primary">{{ projectData.log || 'None' }}</v-chip>
                    </td>
                  </tr>
                </tbody>
              </v-table>

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
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectDataStore } from '@/stores/getProjectData'
import type { ProjectData } from '@/interface/interface'

const { getProjectData } = useProjectDataStore()

const route = useRoute()
const projectData = ref<ProjectData>()

onMounted(async () => {
  await getProjectData(route.params.id.toString()).then((data) => {
    projectData.value = data
  })
})

watch(route, async () => {
  await getProjectData(route.params.id.toString()).then((data) => {
    projectData.value = data
  })
})
</script>
