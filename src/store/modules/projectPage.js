import createPage from "@/store/modules/pageModules/createPage"
import deletePage from "@/store/modules/pageModules/deletePage"
import updatePage from "@/store/modules/pageModules/updatePage"
import updateProjectInfo from "@/store/modules/pageModules/updateProjectInfo"

export default {
    modules: {
        createPage, deletePage, updatePage, updateProjectInfo
    },
    actions: {
        async fetchPhotosFromUnsplash( {commit} ) {
            try {
                const response = await fetch( 'https://api.unsplash.com/search/photos?query=car&client_id=2fVf60IoM7v4K9Vzmjzfta_SLmISel2eWh4YkFouAJc' )
                if( !response.ok )
                    commit('errorSaveImagesList')

                const data = await response.json()
                commit('saveImagesList', data)

            }catch(error){
                console.log( error )
            }
        },
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
        },
        saveImagesList( state, data ) {
            state.imgListLoading = false
            state.imgListError = false
            state.imgList = data.results
        },
        errorSaveImagesList( state ) {
            state.imgListLoading = false
            state.imgListError = true
            state.imgList = []
        }
    },
    state: {
        projectInfo: {},
        projectInfoLoading: true,
        projectInfoError: false,

        pageActiveInfo: null,

        imgList: [],
        imgListLoading: true,
        imgListError: false
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