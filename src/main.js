import {createApp} from 'vue'
import store from '@/store'
import router from '@/router'

import components from '@/components/UI'
import App from '@/App.vue'


const app = createApp(App)

app.use(store)
app.use(router)

components.forEach( component => app.component( component.name, component ) )

app.mount('#app')