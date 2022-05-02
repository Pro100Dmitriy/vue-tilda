export default {
    actions: {
        async fetchProjectInfo( ctx, id ) {
            try {
                const response = await fetch(`http://localhost:8081/projects/${id}`)
                const data = await response.json()
                ctx.commit('updateProjectsInfo', data)
            }catch( error ){
                ctx.commit('errorUpdateProjectsInfo')
            }
        }
    },
    mutations: {
        updateProjectsInfo( state, data ) {
            state.projectInfo = data
            state.pagesListLoading = false
            state.pagesListError = false
        },
        errorUpdateProjectsInfo( state ) {
            state.projectInfo = {}
            state.pagesListLoading = true
            state.pagesListError = true
        },
        openPageSettingsPopup( state, pageId ) {
            state.pageActiveId = pageId
            state.pageSettingsPopup = true
        },
        closePageSettingsPopup( state ) {
            state.pageActiveId = null
            state.pageSettingsPopup = false
        }
    },
    state: {
        projectInfo: {},
        projectInfoLoading: true,
        projectInfoError: false,
        pageSettingsPopup: true,
        pageActiveId: null
    },
    getters: {
        getPages( state ) {
            return state.projectInfo.pagesList
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