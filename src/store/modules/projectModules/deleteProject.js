import useHttp from "@/api/useHttp";

export default {
    actions: {
        async deleteProject( {dispatch}, projectId ) {
            const { request } = useHttp()
            await request( `http://localhost:8081/projects/${projectId}`, 'DELETE' )
                .then( dispatch('fetchProjects') )
                .catch( error => console.log( error ) )
        }
    }
}