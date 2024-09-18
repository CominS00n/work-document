<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="space-y-5">
        <h1 class="font-bold text-lg">Documentation All Project</h1>
        <v-card>
          <v-card-text>
            <v-card-title>All Project</v-card-title>
            <div class="inline-flex flex-wrap justify-evenly gap-5">
              <v-card v-for="item in data" :key="item.id" max-width="360">
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle class="space-x-2">
                  <v-chip
                    size="x-small"
                    :color="item.status === 'Production' ? 'success' : ''"
                    variant="outlined"
                    >{{ item.status }}</v-chip
                  >
                  <v-chip size="x-small" color="secondary">{{ item.type }}</v-chip>
                  <v-chip size="x-small" color="secondary">{{ item.language }}</v-chip>
                </v-card-subtitle>
                <v-card-text>
                  <p>{{ item.detail }}</p>
                  <div class="mt-4">
                    <router-link
                      :to="`/${item.type === 'Web App' ? 'webapp' : item.type}/${item.id}/${item.name}`"
                      ><v-btn
                        variant="outlined"
                        size="small"
                        rounded="xl"
                        append-icon="arrow_forward"
                        class="text-none"
                        >More</v-btn
                      ></router-link
                    >
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title
            ><h2 class="flex items-center">
              GitHub<box-icon type="logo" name="github" class="fill-gray-500"></box-icon></h2
          ></v-card-title>
          <v-card-text>
            <a
              href="https://github.com/develop-billone"
              target="_blank"
              rel="noopener noreferrer"
              class="underline"
              >GitHub</a
            >
          </v-card-text>
        </v-card>
        <div class="gap-x-10 grid md:flex">
          <v-card class="w-full">
            <v-card-title>
              <h2 class="flex items-center">
                Python<box-icon type="logo" name="python" class="fill-blue-500"></box-icon>
              </h2>
            </v-card-title>
            <v-card-text>
              <h5>Install Python</h5>
              <p>Python version 3.10.11</p>
            </v-card-text>
            <v-card-text>
              <h5>Create Virtual Environments</h5>
              <v-code>python -m venv myenv</v-code>
            </v-card-text>
            <v-card-text>
              <h5>Activate Virtual Environments</h5>
              <p>Linux/Mac:<v-code>source myenv/bin/activate</v-code></p>
              <p>Windows:<v-code>myenv/Script/activate</v-code></p>
            </v-card-text>
            <v-card-text>
              <h5>Freeze Package</h5>
              <v-code>pip freeze -> requirements.txt</v-code>
            </v-card-text>
            <v-card-text>
              <h5>Install Package</h5>
              <v-code>pip install -r requirements.txt</v-code>
            </v-card-text>
          </v-card>
          <v-card class="w-full">
            <v-card-title>
              <h2 class="flex items-center">
                Vue<box-icon type="logo" name="vuejs" class="fill-green-500"></box-icon>
              </h2>
            </v-card-title>
            <v-card-text>
              <h5>Install Node.js</h5>
              <a href="https://nodejs.org/en" target="_blank" rel="Node" class="underline"
                >Node JS</a
              >
            </v-card-text>
            <v-card-text>
              <h4>Create Project</h4>
              <div class="flex flex-col gap-y-2">
                <v-code>vue create my-project</v-code>
                <v-code>
                  <div>
                    <p>Select</p>
                    <p>> vue</p>
                    <p>> typescript || javascript</p>
                  </div>
                </v-code>
                <v-code>npm install</v-code>
                <v-code>npm run dev</v-code>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { ProjectData } from '@/interface/interface'
import { useProjectDataStore } from '@/stores/getProjectData'

const { getAllProjectData } = useProjectDataStore()
const data = ref<ProjectData[]>([])

onMounted(async () => {
  await getAllProjectData().then((res) => {
    data.value = res
  })
})
</script>
