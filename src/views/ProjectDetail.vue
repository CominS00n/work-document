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

              <v-divider
                v-if="renderedMarkdown !== ''"
                class="border-opacity-100 my-5"
                :thickness="5"
              ></v-divider>
              <div
                v-if="renderedMarkdown !== ''"
                class="prose prose-lg max-w-none"
                v-html="renderedMarkdown"
                
              ></div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { app } from '@/firebase/firebase'
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'
import { useProjectDataStore } from '@/stores/getProjectData'
import type { ProjectData } from '@/interface/interface'

const { getProjectData } = useProjectDataStore()

const route = useRoute()
const projectData = ref<ProjectData>()
const storage = getStorage(app)
const renderedMarkdown = ref<string>('')

const selectFile = async (filename: string) => {
  if (filename !== '') {
    const fileRef = storageRef(storage, filename)
    const url = await getDownloadURL(fileRef)
    const response = await fetch(url)
    const markdownText = await response.text()
    renderedMarkdown.value = marked(markdownText).toString()
  } else {
    renderedMarkdown.value = ''
  }
}

onMounted(async () => {
  await getProjectData(route.params.id.toString()).then((data) => {
    projectData.value = data.data
    selectFile(data.file)
  })
})

watch(route, async () => {
  await getProjectData(route.params.id.toString()).then((data) => {
    projectData.value = data.data
    selectFile(data.file)
  })
})
</script>
