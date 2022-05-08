import { createStore } from 'vuex'
import mainPageStore from '@/store/modules/mainPage'
import projectPageStore from '@/store/modules/projectPage'
import editPageStore from '@/store/modules/editPage'

const store = createStore({
    modules: {
        mainPage: mainPageStore,
        projectPage: projectPageStore,
        editPage: editPageStore
    }
})

export default store