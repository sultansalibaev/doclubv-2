import './styles/normalize.css'
import './styles/main.css'

import Maska from 'maska'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { http_client } from '@/plugins/httpClient'
import { backendHost, backendPath } from '../app.config'

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import App from './App.vue'
import router from './router'
import i18n from './translate'
const app = createApp(App)
// Vuetify
import vuetify from '@/plugins/vuetify'

const baseComponents = import.meta.globEager('@/components/base/*.vue')
Object.entries(baseComponents).forEach(([path, definition]) => {
	const componentName = path
		.split('/')
		.pop()
		.replace(/\.\w+$/, '')
	app.component(componentName, definition.default)
})

app.use(Maska)
app.use(createPinia())
app.use(http_client, {
	baseUrl: `https://${backendHost}/${backendPath}`,
})
app.use(VuePlyr)
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
