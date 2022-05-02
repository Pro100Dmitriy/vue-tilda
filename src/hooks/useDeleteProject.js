// import http from "@/hooks/http";

export default function useDeleteProject( fetchProjects ) {
    const deleteProject = async (projectId) => {
        try {
            const response = await fetch( `http://localhost:8081/projects/${projectId}`, {method: 'DELETE'} )
            if( response.ok ){
                await fetchProjects()
            }
        }catch(error){
            console.log( error )
        }
        // http( `http://localhost:8081/projects/${projectId}`, 'DELETE' )
        //     .then( async () => {
        //         console.log( fetchProjects )
        //         await fetchProjects()
        //     } )
        //     .catch( error => console.log( error ) )
    }

    return {
        deleteProject
    }
}