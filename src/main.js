import {createApp} from 'vue'
import store from '@/store'
import router from '@/router'
import App from '@/App.vue'



/**
 * Initialize Firebase Storage
 */
import firebase from '@/api/plugins/firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAVyixqYnSNSNrl36xtdZ57_-GYjcrRPoA",
    authDomain: "vuetilda.firebaseapp.com",
    projectId: "vuetilda",
    storageBucket: "vuetilda.appspot.com",
    messagingSenderId: "214650874175",
    appId: "1:214650874175:web:f3bd423f54dd81d40a8b8a"
}


/**
 * UI Components and Layouts
 * @URL: @/components/UI
 * @URL: @/layouts
 */
import ContainerWrapper from "@/layouts/ContainerWrapper"
import LottieConstructor from "@/components/UI/LottieConstructor"
import FillButton from "@/components/UI/FillButton"
import InputTextGroup from "@/components/forms/formItems/InputTextGroup"

// Components register hear
const components = [
    ContainerWrapper, LottieConstructor, FillButton, InputTextGroup
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
app.use(firebase, firebaseConfig)

directives.forEach( directive => app.directive( directive.name, directive.object ) )
components.forEach( component => app.component( component.name, component ) )

app.mount('#app')