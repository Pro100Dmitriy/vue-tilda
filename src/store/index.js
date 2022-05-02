import { createStore } from 'vuex'
import mainPageStore from '@/store/modules/mainPage'
import projectPageStore from '@/store/modules/projectPage'
import editProjectPageStore from '@/store/modules/editProjectPage'

const store = createStore({
    modules: {
        mainPage: mainPageStore,
        projectPage: projectPageStore,
        editProject: editProjectPageStore
    }
})

export default store