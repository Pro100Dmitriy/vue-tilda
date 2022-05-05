import useHttp from "@/api/useHttp"

export default {
    actions: {
        async deletePage( {dispatch}, [projectId, deletePageId] ) {
            const { request } = useHttp()
            const projectData = await request( `http://localhost:8081/projects/${projectId}` )
            if( !projectData )
                throw new Error('Error in useDeletePage')

            projectData.pagesList = projectData.pagesList.filter( page => page.pageId !== deletePageId )

            await request( `http://localhost:8081/projects/${projectId}`, 'PUT', projectData )
                .then( dispatch('fetchProjectInfo', projectId) )
                .catch( error => console.log( error ) )
        }
    }
}