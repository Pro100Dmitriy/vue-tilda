import server from "@/api/server"

export default {
    actions: {
        async deletePage( {dispatch}, [projectId, deletePageId] ) {
            const { request } = server()
            const projectData = await request( `http://localhost:8081/projects/${projectId}` )
            if( !projectData )
                throw new Error('Error in useDeletePage')

            projectData.pagesList = projectData.pagesList.filter( page => page.pageId !== deletePageId )

            await request( `http://localhost:8081/projects/${projectId}`, 'PUT', projectData )
            dispatch('fetchProjectInfo', projectId)
        }
    }
}