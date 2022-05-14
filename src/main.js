import {createApp} from 'vue'
import store from '@/store'
import router from '@/router'
import App from '@/App.vue'



/**
 * Initialize Firebase Storage
 */
import firebase from '@/api/plugins/firebase'
import keys from '@/api/keys'


/**
 * UI Components and Layouts
 * @URL: @/components/UI
 * @URL: @/layouts
 * @URL: @/forms
 */
import LottieConstructor from "@/components/UI/LottieConstructor"
import FillButton from "@/components/UI/FillButton"
import InputTextGroup from "@/components/forms/formItems/InputTextGroup"

// Components register hear
const components = [
    LottieConstructor, FillButton, InputTextGroup
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
app.use(firebase, keys.firebaseConfig)

directives.forEach( directive => app.directive( directive.name, directive.object ) )
components.forEach( component => app.component( component.name, component ) )

app.mount('#app')