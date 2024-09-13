<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="space-y-5">
        <v-card>
          <v-card-title>
            <h3>Google From</h3>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="flex gap-x-2">
                <v-select
                  v-model="type"
                  label="Select Type"
                  :items="['Web App', 'API', 'Crontab', 'Script']"
                  variant="outlined"
                  density="compact"
                ></v-select>
                <v-select
                  v-model="language"
                  label="Select Language/Framework"
                  :items="[
                    'Python',
                    'Typescript',
                    'Javascript',
                    'Vue',
                    'React',
                    'Django',
                    'Flask',
                    'PHP'
                  ]"
                  variant="outlined"
                  density="compact"
                ></v-select>
              </div>
              <v-text-field
                v-model="name"
                label="Name"
                density="compact"
                variant="underlined"
                required
              ></v-text-field>
              <v-textarea
                v-model="detail"
                label="Detail"
                density="compact"
                variant="underlined"
                required
              ></v-textarea>
              <v-select
                v-model="deploy"
                label="Deploy Status"
                :items="['In process', 'Testbed', 'Production']"
                variant="outlined"
                density="compact"
              ></v-select>
              <div class="flex gap-x-2">
                <v-text-field
                  v-model="ip"
                  label="IP Address"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="directory"
                  label="Directory"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="url"
                  label="URL"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="log"
                  label="Log Directory"
                  variant="underlined"
                  required
                ></v-text-field>
              </div>
              <div class="flex gap-x-2">
                <v-text-field
                  v-model="document"
                  label="Document"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="etc"
                  label="etc."
                  variant="underlined"
                  required
                ></v-text-field>
              </div>
              <v-btn @click="submitToGoogleSheets">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <v-card height="640">
          <v-card-title>
            <h3>Readme.md</h3>
          </v-card-title>
          <v-card-text class="h-[600px]">
            <v-row class="h-full">
              <v-col cols="6">
                <h3 class="font-bold">Writing:</h3>
                <textarea
                  v-model="readme"
                  name="writemd"
                  id="writemd"
                  class="w-full h-full p-3 resize-none border rounded-md"
                ></textarea>
              </v-col>
              <v-col cols="6">
                <h3 class="font-bold">Preview:</h3>
                <div class="w-full h-full p-3 border rounded-md">
                  <div v-html="renderedMarkdown"></div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'

import { ref, computed } from 'vue'
import { marked } from 'marked'

const name = ref('')
const detail = ref('')
const ip = ref('')
const directory = ref('')
const url = ref('')
const log = ref('')
const document = ref('')
const etc = ref('')
const type = ref('')
const language = ref('')
const deploy = ref('')
const readme = ref('')
const valid = ref(true)

const renderedMarkdown = computed(() => marked(readme.value))

const submitToGoogleSheets = async () => {
  const formData = {
    type: type.value,
    name: name.value,
    language: language.value,
    detail: detail.value,
    status: deploy.value,
    ip: ip.value,
    directory: directory.value,
    url: url.value,
    log: log.value,
    document: document.value,
    etc: etc.value
  }

  try {
    const response = await axios({
      method: 'post',
      url: 'https://script.google.com/macros/s/AKfycbxiAmZFkSgI3zbhawls0QfQmZSJS4qL1bnjD2bc5noOi2hA-pIUF5EMccuUnZ5AE6XY9w/exec',
      data: formData,
      
    })
    if (response.data.status === 'success') {
      alert('Data has been saved to Google Sheets successfully!')
    } else {
      alert('Failed to save data to Google Sheets')
    }
  } catch (error) {
    console.error('Error saving data to Google Sheets:', error)
    alert('Error occurred while saving data to Google Sheets')
  }
}
</script>
