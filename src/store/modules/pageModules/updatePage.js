import server from "@/api/server"

export default {
    actions: {
        async updatePage( {dispatch}, [projectId, pageId, newValues] ) {
            const { request } = server()
            const projectData = await request( `http://localhost:8081/projects/${projectId}` )
            const pageData = await request( `http://localhost:8081/pages/${pageId}` )
            if( !projectData && !pageData )
                throw new Error('Error in updatePage')

            const [ selectedPage ] = projectData.pagesList.filter( page =>  page.pageId === pageId )
            const otherPages = projectData.pagesList.filter( page =>  page.pageId !== pageId )

            const changedPage = {
                ...selectedPage,
                ...newValues
            }

            const changedPageData = {
                ...pageData,
                ...newValues
            }

            projectData.pagesList = [
                ...otherPages,
                changedPage
            ]

            await request( `http://localhost:8081/projects/${projectId}`, 'PUT', projectData )
            await request( `http://localhost:8081/pages/${pageId}`, 'PUT', changedPageData )
            dispatch('fetchProjectInfo', projectId)
        }
    }
}