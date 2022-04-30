import {createApp} from 'vue'
import store from '@/store'
import router from '@/router'
import App from '@/App.vue'

/**
 * UI Components
 * @URL: @/components/UI
 */
import PlusButton from "@/components/UI/PlusButton"
import LottieConstructor from "@/components/UI/LottieConstructor"
import FillButton from "@/components/UI/FillButton"

// Components register hear
const components = [
    PlusButton, LottieConstructor, FillButton
]


/**
 * Directives
 * @URL: @/directives
 */
import svgDirective from '@/directives/svgSprite'

// Directives register hear
const directives = [
    { name: 'sprite', object: svgDirective }
]


const app = createApp(App)

app.use(store)
app.use(router)

directives.forEach( directive => app.directive( directive.name, directive.object ) )
components.forEach( component => app.component( component.name, component ) )

app.mount('#app')