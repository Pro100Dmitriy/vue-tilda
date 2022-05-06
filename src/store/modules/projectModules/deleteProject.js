import server from "@/api/server";

export default {
    actions: {
        async deleteProject( {dispatch}, projectId ) {
            const { request } = server()
            await request( `http://localhost:8081/projects/${projectId}`, 'DELETE' )
                .then( dispatch('fetchProjects') )
                .catch( dispatch('fetchProjects') )
        }
    }
}