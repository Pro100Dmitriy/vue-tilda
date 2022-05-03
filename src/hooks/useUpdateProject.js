import useHttp from "@/hooks/useHttp";

export default function useUpdateProject( fetchProjects ) {
    const { request } = useHttp()
    const updateProject = async ( projectId, title ) => {
        const projectData = await request( `http://localhost:8081/projects/${projectId}` )
        if( !projectData )
            throw new Error('Error in useUpdateProject')

        const changedProject = {
            ...projectData,
            title
        }

        await request( `http://localhost:8081/projects/${projectId}`, 'PUT', changedProject )
            .then( fetchProjects() )
            .catch( error => console.log( error ) )
    }

    return {
        updateProject
    }
}