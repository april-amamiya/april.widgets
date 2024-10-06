import { createApp } from 'vue'
import App from './app.vue'
import { createAppRouter } from './modules/router'
import '@/assets/tailwind.css'

createApp(App).use(createAppRouter()).mount('#app')
