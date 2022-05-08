export default {
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
        pageInfoError: false
    },
    getters: {},
    namespaced: true
}