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
                  v-model="formData.type"
                  label="Select Type"
                  :items="['Web App', 'API', 'Crontab', 'Script']"
                  variant="outlined"
                  density="compact"
                  required
                ></v-select>
                <v-select
                  v-model="formData.language"
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
                  required
                ></v-select>
              </div>
              <v-text-field
                v-model="formData.name"
                label="Name"
                density="compact"
                variant="underlined"
                required
              ></v-text-field>
              <v-textarea
                v-model="formData.detail"
                label="Detail"
                density="compact"
                variant="underlined"
                required
              ></v-textarea>
              <v-select
                v-model="formData.status"
                label="Deploy Status"
                :items="['In process', 'Testbed', 'Production']"
                variant="outlined"
                density="compact"
              ></v-select>
              <div class="flex gap-x-2">
                <v-text-field
                  v-model="formData.ip"
                  label="IP Address"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="formData.directory"
                  label="Directory"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="formData.url"
                  label="URL"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="formData.log"
                  label="Log Directory"
                  variant="underlined"
                  required
                ></v-text-field>
              </div>
              <div class="flex gap-x-2">
                <v-text-field
                  v-model="formData.document"
                  label="Document"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="formData.etc"
                  label="etc."
                  variant="underlined"
                  required
                ></v-text-field>
              </div>
            </v-form>
          </v-card-text>
          <v-card-text>
            <v-divider class="border-opacity-75"
              ><v-btn
                @click="showReadme = !showReadme"
                density="compact"
                :prepend-icon="showReadme ? 'remove' : 'add'"
                >{{ showReadme ? 'remove' : 'add' }} readme</v-btn
              ></v-divider
            >
          </v-card-text>
          <v-card-text class="h-[600px]" v-if="showReadme">
            <h3>Readme.md</h3>
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

          <v-card-text>
            <v-btn @click="submitToGoogleSheets" class="w-full">Submit</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { ref, computed, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import { addProject } from '@/firebase/firebase'
import type { ProjectData } from '@/interface/interface'

const readme = ref('')
const valid = ref(true)
const showReadme = ref(false)
const toast = useToast()

const renderedMarkdown = computed(() => marked(readme.value))
const formData = reactive<ProjectData>({
  id: '',
  type: '',
  name: '',
  language: '',
  detail: '',
  status: '',
  ip: '',
  directory: '',
  url: '',
  log: '',
  document: '',
  etc: ''
})

const submitToGoogleSheets = async () => {
  try {
    const URL =
      'https://script.google.com/macros/s/AKfycbxJzfTPzvdy-7eJcWbcO4W82TjyGiltR6dsecyOwcCDHsAa_7jiZYJWi-mWGYHIbMIgaQ/exec'
    await fetch(URL, {
      redirect: 'follow',
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    }).then((res) => {
      if (res.ok) {
        console.log('Data saved successfully')
      } else {
        console.error('Error occurred while saving data to Google Sheets')
        toast.error('Error occurred while saving data to Google Sheets')
      }
    })
  } catch (error) {
    console.error('Error saving data to Google Sheets:', error)
  }

  try {
    await addProject(formData, readme.value)
    console.log('Data saved successfully')
    formData.type = ''
    formData.name = ''
    formData.language = ''
    formData.detail = ''
    formData.status = ''
    formData.ip = ''
    formData.directory = ''
    formData.url = ''
    formData.log = ''
    formData.document = ''
    formData.etc = ''
    toast.success('Data saved successfully')
  } catch (error) {
    console.error('Error saving data to Firestore:', error)
    toast.error('Error occurred while saving data to Firestore')
  } finally {
    location.reload()
  }
}
</script>
