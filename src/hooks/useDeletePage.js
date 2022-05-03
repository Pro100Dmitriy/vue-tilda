import useHttp from "@/hooks/useHttp";

export default function useDeletePage( projectId, fetchPages ) {
    const { request } = useHttp()
    const deletePage = async (deletePageId) => {
        const projectData = await request( `http://localhost:8081/projects/${projectId}` )
        if( !projectData )
            throw new Error('Error in useDeletePage')

        projectData.pagesList = projectData.pagesList.filter( page => page.pageId !== deletePageId )

        await request( `http://localhost:8081/projects/${projectId}`, 'PUT', projectData )
            .then( fetchPages(projectId) )
            .catch( error => console.log( error ) )
    }

    return {
        deletePage
    }
}