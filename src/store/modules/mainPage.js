export default {
    actions: {
        async fetchProjects( ctx ) {
            try {
                const response = await fetch(`http://localhost:8081/projects`)
                const data = await response.json()
                ctx.commit('updateProjects', data)
            }catch( error ){
                ctx.commit('errorUpdateProjects')
            }
        }
    },
    mutations: {
        updateProjects( state, projects ) {
            if( projects.length % 2 !== 0 ){
                state.projects = [ ...projects, {id: null, title: null} ]
            }else{
                state.projects = projects
            }
            state.loading = false
            state.error = false
        },
        errorUpdateProjects( state ) {
            state.projects = []
            state.loading = false
            state.error = true
        }
    },
    state: {
        projects: [],
        loading: true,
        error: false
    },
    getters: {
        getProjects( state ) {
            return state.projects
        },
        getLoading( state ) {
            return state.loading
        },
        getError( state ) {
            return state.error
        },
        getListSettings( state ) {
            return state.listSettings
        }
    }
}