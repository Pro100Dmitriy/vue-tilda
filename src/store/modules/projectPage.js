import createPage from "@/store/modules/pageModules/createPage"
import deletePage from "@/store/modules/pageModules/deletePage"

export default {
    modules: {
        createPage, deletePage
    },
    actions: {
        async fetchProjectInfo( {commit}, id ) {
            try {
                const response = await fetch(`http://localhost:8081/projects/${id}`)
                const data = await response.json()
                commit('updateProjectsInfo', data)
            }catch( error ){
                commit('errorUpdateProjectsInfo')
            }
        }
    },
    mutations: {
        updateProjectsInfo( state, data ) {
            state.projectInfo = data
            state.projectInfoLoading = false
            state.projectInfoError = false
        },
        errorUpdateProjectsInfo( state ) {
            state.projectInfo = {}
            state.projectInfoLoading = true
            state.projectInfoError = true
        },
        openPageSettingsPopup( state, pageId ) {
            document.body.style.overflow = 'hidden'

            const pagesList = state.projectInfo.pagesList
            const pageActiveInfo = pagesList.filter( page => page.pageId === pageId )

            state.pageActiveId = pageId
            state.pageActiveInfo = pageActiveInfo[0]
            state.pageSettingsPopup = true
        },
        closePageSettingsPopup( state ) {
            document.body.style.overflow = 'auto'
            state.pageActiveId = null
            state.pageSettingsPopup = false
        },
        saveClosePageSettingsPopup( state ) {
            document.body.style.overflow = 'auto'

            /*
            * @TODO Doing here
            * */

            state.pageActiveId = null
            state.pageActiveInfo = {}
            state.pageSettingsPopup = false
        },
        openProjectDomenPopup( state ) {
            document.body.style.overflow = 'hidden'
            state.projectDomenPopup = true
        },
        closeProjectDomenPopup( state ) {
            document.body.style.overflow = 'auto'
            state.projectDomenPopup = false
        }
    },
    state: {
        projectInfo: {},
        projectInfoLoading: true,
        projectInfoError: false,

        pageSettingsPopup: false,
        pageActiveId: null,
        pageActiveInfo: {},

        projectDomenPopup: false
    },
    getters: {
        getPages( state ) {
            if( state.projectInfo.pagesList ) {
                return state.projectInfo.pagesList
            } else {
                return []
            }
        },
        getProjectInfoLoading( state ) {
            return state.pagesListLoading
        },
        getProjectInfoError( state ) {
            return state.pagesListError
        }
    },
    namespaced: true
}