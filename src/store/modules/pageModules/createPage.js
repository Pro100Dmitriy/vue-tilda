import useHttp from "@/api/useHttp"
import testImage from "@/assets/img/testImg.jpg";

export default {
    actions: {
        async createPage( {dispatch}, projectId ) {
            const { request } = useHttp()
            const projectData = await request( `http://localhost:8081/projects/${projectId}` )
            if( !projectData )
                throw new Error('Error in useCreatePage')

            const pageId = Date.now()

            const newPageListItem = {
                pageId,
                projectId: projectId,
                title: 'My new page',
                description: '',
                URL: '',
                prevImage: testImage
            }

            projectData.pagesList.push(newPageListItem)

            await request( `http://localhost:8081/projects/${projectId}`, 'PUT', projectData )
                .then( dispatch('fetchProjectInfo', projectId) )
                .catch( error => console.log( error ) )
        }
    }
}