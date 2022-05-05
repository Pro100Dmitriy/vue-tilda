import useHttp from "@/api/useHttp"

export default {
    actions: {
        async updateProject( {dispatch}, [projectId, title] ) {
            const { request } = useHttp()
            const projectData = await request( `http://localhost:8081/projects/${projectId}` )
            if( !projectData )
                throw new Error('Error in useUpdateProject')

            const changedProject = {
                ...projectData,
                title
            }

            await request( `http://localhost:8081/projects/${projectId}`, 'PUT', changedProject )
                .then( dispatch('fetchProjects') )
                .catch( error => console.log( error ) )
        }
    }
}