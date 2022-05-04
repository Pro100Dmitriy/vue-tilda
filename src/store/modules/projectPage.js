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

            /*
            * @TODO Doing here
            * */

            state.pageActiveId = pageId
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
            state.pageSettingsPopup = false
        }
    },
    state: {
        projectInfo: {},
        projectInfoLoading: true,
        projectInfoError: false,
        pageSettingsPopup: false,
        pageActiveId: null
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