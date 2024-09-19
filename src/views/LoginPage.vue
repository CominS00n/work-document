<template>
  <div class="h-svh w-svw flex justify-center items-center">
    <v-card width="540">
      <v-card-title>
        <h2 class="text-center">Login</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="username"
          label="Username"
          variant="underlined"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          variant="underlined"
          type="password"
          required
        ></v-text-field>
      </v-card-text>
      <template v-slot:actions>
        <v-btn @click="submit" variant="outlined" class="flex-grow-1">Submit</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
      </template>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'

const { login } = useLoginStore()
const username = ref('')
const password = ref('')

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length >= 8) || 'Password must be at least 8 characters'
]

const submit = async () => {
  await login(username.value.trim(), password.value)
}

const router = useRouter()
const cancel = () => {
  username.value = ''
  password.value = ''
  router.push('/')
}
</script>
