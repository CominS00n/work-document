import 'boxicons'
import './assets/main.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, md } from 'vuetify/iconsets/md'

//Toast
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
        md,
    },
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(Toast)

app.mount('#app')
