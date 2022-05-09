import saveLayout from "@/store/modules/editModules/saveLayout"

export default {
    modules: {
        saveLayout
    },
    actions: {
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
        }
    },
    state: {
        pageInfo: {},
        pageInfoLoading: true,
        pageInfoError: false,

        layoutIsSaved: false
    },
    getters: {
        getLayout( state ) {
            if( state.pageInfo.layout.length && !state.pageInfoLoading ){
                console.log( 1 )
                return state.pageInfo.layout
            } else {
                return []
            }
        }
    },
    namespaced: true
}