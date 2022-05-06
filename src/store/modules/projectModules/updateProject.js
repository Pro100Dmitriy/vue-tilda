import server from "@/api/server"

export default {
    actions: {
        async updateProject( {dispatch}, [projectId, newObject] ) {
            const { request } = server()
            const projectData = await request( `http://localhost:8081/projects/${projectId}` )
            if( !projectData )
                throw new Error('Error in useUpdateProject')

            const changedProject = {
                ...projectData,
                ...newObject
            }

            await request( `http://localhost:8081/projects/${projectId}`, 'PUT', changedProject )
                .then( dispatch('fetchProjects') )
                .catch( error => console.log( error ) )
        }
    }
}