import server from "@/api/server"
import pageUpdateAndFetch from '@/store/modules/editModules/pageUpdateAndFetch'

export default {
    modules: {
        pageUpdateAndFetch
    },
    actions: {
        async saveLayout( {commit}, [pageId, layout] ) {
            commit('layoutEdited')
            const { request } = server()
            const pageData = await request( `http://localhost:8081/pages/${pageId}` )
            if( !pageData )
                throw new Error('Error => "@/store/modules/editPage" => saveLayout( {commit}, [pageId, layout] )')

            pageData.layout = layout

            await request( `http://localhost:8081/pages/${pageId}`, 'PUT', pageData )
            commit('layoutSaved')
        },
        async fetchPage( {commit}, id ) {
            try {
                commit('beforeFetching')
                const response = await fetch(`http://localhost:8081/pages/${id}`)
                if( !response.ok )
                    throw new Error('Error => "@/store/modules/editPage" => fetchPage({commit}, id)')

                const data = await response.json()
                commit('uploadedInfo', data)
            }catch( error ){
                commit('errorFetching')
            }
        },
        async updateInfo( {commit}, id ) {
            try {
                const response = await fetch(`http://localhost:8081/pages/${id}`)
                if( !response.ok )
                    throw new Error('Error => "@/store/modules/editPage" => updateInfo(state, data)')

                const data = await response.json()
                commit('uploadedInfo', data)
            }catch( error ){
                commit('errorFetching')
            }
        }
    },
    mutations: {
        beforeFetching( state ) {
            state.pageInfoLoading = true
            state.pageInfoError = false
        },
        uploadedInfo( state, data ) {
            state.pageInfoLoading = false
            state.pageInfoError = false
            state.pageInfo = data
        },
        errorFetching( state ) {
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