import server from "@/api/server"

export default {
    actions: {
        async saveLayout( {commit}, [pageId, layout] ) {
            const { request } = server()
            const pageData = await request( `http://localhost:8081/pages/${pageId}` )
            if( !pageData )
                throw new Error('Error in save layout')

            pageData.layout = layout

            await request( `http://localhost:8081/pages/${pageId}`, 'PUT', pageData )
            commit('layoutSaved')
        },
        async fetchPageInfo( {commit}, id ) {
            try {
                const response = await fetch(`http://localhost:8081/pages/${id}`)
                const data = await response.json()
                commit('updatePageInfo', data)
            }catch( error ){
                commit('errorUpdatePageInfo')
            }
        }
    },
    mutations: {
        updatePageInfo( state, data ) {
            state.pageInfoLoading = false
            state.pageInfoError = false
            state.pageInfo = data
        },
        errorUpdatePageInfo( state ) {
            state.pageInfoLoading = false
            state.pageInfoError = true
            state.pageInfo = {}
        },
        layoutEdited( state ) {
            state.layoutIsSaved = false
        },
        layoutSaved( state ) {
            state.layoutIsSaved = true
        }
    },
    state: {
        pageInfo: {},
        pageInfoLoading: true,
        pageInfoError: false,

        layoutIsSaved: true
    },
    getters: {
        getLayout( state ) {
            if( state.pageInfo.layout.length && !state.pageInfoLoading ){
                return state.pageInfo.layout
            } else {
                return []
            }
        }
    },
    namespaced: true
}