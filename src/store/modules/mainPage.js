import createProject from "@/store/modules/projectModules/createProject"
import deleteProject from "@/store/modules/projectModules/deleteProject"
import updateProject from "@/store/modules/projectModules/updateProject"

export default {
    modules: {
        createProject, deleteProject, updateProject
    },
    actions: {
        async fetchProjects( {commit} ) {
            try {
                const response = await fetch(`http://localhost:8081/projects`)
                const data = await response.json()
                commit('updateProjects', data)
            }catch( error ){
                commit('errorUpdateProjects')
            }
        }
    },
    mutations: {
        updateProjects( state, projects ) {
            state.projectsList = projects
            state.isProjectLoading = false
            state.isProjectError = false
        },
        errorUpdateProjects( state ) {
            state.projectsList = []
            state.isProjectLoading = false
            state.isProjectError = true
        }
    },
    state: {
        projectsList: [],
        isProjectLoading: true,
        isProjectError: false
    },
    getters: {},
    namespaced: true
}