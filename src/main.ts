import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import { use } from 'vue/types/umd'
import VueAxios from 'vue-axios'



use.config.productionTip = false
use(BootstrapVue)
use(IconsPlugin)
use(VueAxios, axios)n

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/boostrap-vue-css'

createApp(App).use(store).use(router).mount('#app')
