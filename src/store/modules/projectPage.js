import createPage from "@/store/modules/pageModules/createPage"
import deletePage from "@/store/modules/pageModules/deletePage"
import updatePage from "@/store/modules/pageModules/updatePage"

export default {
    modules: {
        createPage, deletePage, updatePage
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
        getSelectedPageInfo( state, pageId ) {
            const pagesList = state.projectInfo.pagesList
            const pageActiveInfo = pagesList.filter( page =>  page.pageId === pageId )
            state.pageActiveInfo = pageActiveInfo[0]
        }
    },
    state: {
        projectInfo: {},
        projectInfoLoading: true,
        projectInfoError: false,

        pageActiveInfo: null
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
        },
        getPageActiveInfo( state ) {
            if( state.pageActiveInfo ) {
                return state.pageActiveInfo
            } else {
                return ''
            }
        }
    },
    namespaced: true
}