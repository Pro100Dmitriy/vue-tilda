export default {
    actions: {},
    mutations: {
        createNewProject( state, newProject ) {
            console.log( newProject )
            state.projects.push(newProject)
        }
    },
    state: {
        projects: [
            {id: 1, title: 'My Project'},
            {id: 2, title: 'My Project 1'},
            {id: 3, title: 'My Project 2'},
            {id: 4, title: 'My Project 3'}
        ]
    },
    getters: {
        getProjects( state ) {
            return state.projects
        }
    }
}