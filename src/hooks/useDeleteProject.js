import useHttp from "@/hooks/useHttp";

export default function useDeleteProject( fetchProjects ) {
    const { request } = useHttp()
    const deleteProject = async (projectId) => {
        await request( `http://localhost:8081/projects/${projectId}`, 'DELETE' )
            .then( fetchProjects() )
            .catch( error => console.log( error ) )
    }

    return {deleteProject}
}