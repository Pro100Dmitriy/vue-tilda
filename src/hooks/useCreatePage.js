import useHttp from "@/hooks/useHttp"
import testImage  from '@/assets/img/testImg.jpg'


export default function useCreatePage( projectId, fetchPages ) {
    const { request } = useHttp()
    const createPage = async () => {
        const projectData = await request( `http://localhost:8081/projects/${projectId}` )
        if( !projectData )
            throw new Error('Error in useCreatePage')

        const pageId = Date.now()

        const newPageListItem = {
            pageId,
            projectId: projectId,
            title: 'My new page',
            prevImage: testImage
        }

        projectData.pagesList.push(newPageListItem)

        await request( `http://localhost:8081/projects/${projectId}`, 'PUT', projectData )
            .then( fetchPages(projectId) )
            .catch( error => console.log( error ) )
    }

    return {createPage}
}



// const page = {
//     id: pageId,
//     projectId: projectId,
//     title: '',
//     description: '',
//     URL: '',
//     prevImage: '',
//     layoutsId: ''
// }
//
// useHttp( `http://localhost:8081/projects/${projectId}`, 'POST', newProject )
//     .then( fetchProjects() )
//     .catch( error => console.log( error ) )
//
// useHttp( 'http://localhost:8081/pages', 'POST', newProject )
//     .then( fetchProjects() )
//     .catch( error => console.log( error ) )