<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="space-y-3">
        <v-card>
          <v-card-title>
            <h2>Add Role</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Role" variant="underlined" required> </v-text-field>
            <v-text> Permission </v-text>
            <div class="flex gap-x-5">
              <v-checkbox v-model="data.view" label="view"></v-checkbox>
              <v-checkbox v-model="data.insert" label="insert"></v-checkbox>
              <v-checkbox v-model="data.update" label="update"></v-checkbox>
              <v-checkbox v-model="data.delete" label="delete"></v-checkbox>
              <v-checkbox v-model="data.super" label="superadmin"></v-checkbox>
            </div>
            <v-btn>Submit</v-btn>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title>
            <h2>Role</h2>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { PermissionData } from '@/interface/interface'

const data = reactive<PermissionData>({
  role: '',
  view: false,
  insert: false,
  update: false,
  delete: false,
  super: false
})
</script>
