import { createStore } from 'vuex'
import mainPageStore from './modules/mainPage'

const store = createStore({
    modules: {
        mainPageStore
    }
})

export default store