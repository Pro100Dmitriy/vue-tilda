// import useHttp from "@/hooks/useHttp";

export default function useDeletePage( projectId, fetchPages ) {
    const deletePage = async (deletePageId) => {
        try{
            const getResponse = await fetch( `http://localhost:8081/projects/${projectId}` )

            if( !getResponse.ok )
                throw new Error('Error in useCreatePage')

            const projectData = await getResponse.json()

            projectData.pagesList = projectData.pagesList.filter( page => page.pageId !== deletePageId )

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
    }

    return {
        deletePage
    }
}