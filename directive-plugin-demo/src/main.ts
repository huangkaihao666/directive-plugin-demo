import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import lazyLoadDirective from '@/directive/lazy-load/lazy-load'
import alertPlugin  from '@/plugin/alert'

const app = createApp(App)
app.directive('lazy', lazyLoadDirective)
app.use(router)
app.use(alertPlugin)

app.mount('#app')
