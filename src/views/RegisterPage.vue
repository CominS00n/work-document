<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title> Register </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="data.username"
              label="Username"
              variant="underlined"
              density="compact"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              density="compact"
              variant="underlined"
              type="password"
              :rules="passRule"
              required
            ></v-text-field>
            <v-text-field
              v-model="confirmPass"
              label="Confirm Password"
              density="compact"
              variant="underlined"
              type="password"
              required
            ></v-text-field>
            <v-select
              v-model="data.role"
              label="Select"
              variant="underlined"
              density="compact"
              :items="roleItems"
            ></v-select>
            <v-btn @click="submit">Submit</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { addUsers } from '@/firebase/register'
import type { RegisterData } from '@/interface/interface'

import sha256 from 'crypto-js/sha256'

const passRule = [
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length >= 8) || 'Password must be at least 8 characters'
]

const data = reactive<RegisterData>({
  username: '',
  password: '',
  role: ''
})

const password = ref('')
const confirmPass = ref('')
const roleItems = ['admin', 'user']
const toast = useToast()

const submit = () => {
  if (password.value !== confirmPass.value) {
    toast.error('Password does not match')
  } else {
    const hashed = sha256(password.value).toString()
    data.password = hashed
    try {
      addUsers(data).then(() => {
        data.username = ''
        data.password = ''
        data.role = ''
        password.value = ''
        confirmPass.value = ''
      })
    } catch (error) {
      toast.error('Error')
    }
  }
}
</script>
