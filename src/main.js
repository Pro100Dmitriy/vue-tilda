import {createApp} from 'vue'
import store from '@/store'
import router from '@/router'

/**
 * UI Components
 * URL: @/components/UI
 */
import PlusButton from "@/components/UI/PlusButton"
import LottieConstructor from "@/components/UI/LottieConstructor"

import App from '@/App.vue'


// Components register hear
const components = [
    PlusButton, LottieConstructor
]
const app = createApp(App)

app.use(store)
app.use(router)

components.forEach( component => app.component( component.name, component ) )

app.mount('#app')