<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card max-width="540">
          <v-card-text>
            <h1>Login</h1>
            <v-form ref="form" v-model="valid" lazy-validation>
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
              <v-btn @click="submit">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoginStore } from '@/stores/login'

const { login } = useLoginStore()
const username = ref('')
const password = ref('')
const valid = ref(true)

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length >= 8) || 'Password must be at least 8 characters'
]

const submit = () => {
  login(username.value, password.value)
}
</script>
