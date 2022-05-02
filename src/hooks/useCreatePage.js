// import useHttp from "@/hooks/useHttp"
import testImage  from '@/assets/img/testImg.jpg'


export default function useCreatePage( projectId, fetchPages ) {
    const createPage = async () => {
        try{
            const getResponse = await fetch( `http://localhost:8081/projects/${projectId}` )

            if( !getResponse.ok )
                throw new Error('Error in useCreatePage')

            const projectData = await getResponse.json()
            const pageId = Date.now()

            const newPageListItem = {
                pageId,
                projectId: projectId,
                title: 'My new page',
                prevImage: testImage
            }

            projectData.pagesList.push(newPageListItem)

            const putResponse = await fetch( `http://localhost:8081/projects/${projectId}`, {
                method: 'PUT',
                body: JSON.stringify(projectData),
                headers: { 'Content-Type': 'application/json' }
            } )

            if( !putResponse.ok )
                throw new Error('Error in useCreatePage')

            await fetchPages(projectId)

            // useHttp( `http://localhost:8081/projects/${projectId}`, 'PUT', projectData )
            //     .then( fetchPages(projectId) )
            //     .catch( error => console.log( error ) )

        }catch(error){
            console.log( error )
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
    }

    return {
        createPage
    }
}