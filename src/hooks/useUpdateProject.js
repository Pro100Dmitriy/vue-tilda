import useHttp from "@/hooks/useHttp";

export default function useUpdateProject( fetchProjects ) {
    const updateProject = async ( projectId, title ) => {
        try {
            const response = await fetch( `http://localhost:8081/projects/${projectId}` )
            const data = await response.json()

            const changedProject = {
                ...data,
                title
            }

            useHttp( `http://localhost:8081/projects/${projectId}`, 'PUT', changedProject )
                .then( fetchProjects() )
                .catch( error => console.log( error ) )

        }catch( error ){
            console.log( error )
        }
    }

    return {
        updateProject
    }
}