<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>User Management</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in data" :key="item.id">
                  <td>{{ item.username }}</td>
                  <td>
                    {{ item.password }}
                  </td>
                  <td>{{ item.role }}</td>
                  <td class="space-x-2">
                    <v-btn
                      variant="text"
                      :disabled="disabled(item.username)"
                      @click="openEditUser(item.id)"
                      ><box-icon name="edit-alt"></box-icon
                    ></v-btn>
                    <v-btn
                      variant="text"
                      @click="deleteUser(item.id)"
                      :disabled="disabled(item.username)"
                    >
                      <box-icon name="trash" class="fill-red-500"></box-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>

        <v-dialog v-model="dialog" max-width="600">
          <v-card title="User Profile">
            <v-card-text>
              <v-text-field
                label="ID"
                density="compact"
                variant="outlined"
                v-model="userEdit.id"
                disabled
              ></v-text-field>
              <v-text-field
                label="Username"
                density="compact"
                variant="outlined"
                v-model="userEdit.username"
              ></v-text-field>
              <v-text-field
                label="Password"
                density="compact"
                variant="outlined"
                type="password"
                v-model="userEdit.password"
              ></v-text-field>
              <v-select
                v-model="userEdit.role"
                label="Select"
                variant="underlined"
                density="compact"
                :items="['super-admin', 'admin', 'user']"
              ></v-select>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="Save" variant="outlined" min-width="240" @click="saveUser"></v-btn>
              <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useUserStore } from '@/stores/getUserData'
import { useDelUserStore } from '@/stores/delUser'
import { useEditUserStore } from '@/stores/editUser'
import type { UserData } from '@/interface/interface'
import { useToast } from 'vue-toastification'

import sha256 from 'crypto-js/sha256'

const { getUserData } = useUserStore()
const { delUser } = useDelUserStore()
const { editUser } = useEditUserStore()
const toast = useToast()

const disabled = (user: string) => {
  return user === localStorage.getItem('username') ? true : false
}
const dialog = ref(false)

const data = ref<UserData[]>([])
onMounted(async () => {
  await getUserData().then((res) => {
    data.value = res
  })
})

const userEdit = reactive<UserData>({
  id: '',
  username: '',
  password: '',
  role: ''
})
const oldPassword = ref('')
const openEditUser = (id: string) => {
  const user = data.value.find((item) => item.id === id) as UserData
  userEdit.id = user.id
  userEdit.username = user.username
  oldPassword.value = user.password
  userEdit.role = user.role
  dialog.value = true
}
const saveUser = () => {
  if (userEdit.password === '') {
    userEdit.password = oldPassword.value
  } else if (userEdit.password !== '') {
    const hash = sha256(userEdit.password).toString()
    if (hash === oldPassword.value) {
      toast.error('Password must be different from the previous one', { timeout: 2000 })
    } else {
      userEdit.password = hash
    }
  }
  try {
    editUser(userEdit.id, userEdit.username, userEdit.password, userEdit.role).then(() => {
      getUserData().then((res) => {
        data.value = res
      })
    })
  } catch (error) {
    toast.error('Failed to update user data', { timeout: 2000 })
  } finally {
    toast.success('User data has been updated', { timeout: 2000 })
    dialog.value = false
    userEdit.id = ''
    userEdit.username = ''
    userEdit.password = ''
    userEdit.role = ''
    oldPassword.value = ''
  }
}

const deleteUser = (id: string) => {
  delUser(id).then(() => {
    getUserData().then((res) => {
      data.value = res
    })
  })
}
</script>
