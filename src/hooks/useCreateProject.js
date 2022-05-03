import useHttp from "@/hooks/useHttp"

export default function useCreateProject( projects, fetchProjects ) {
    const { request } = useHttp()
    const createProject = async () => {
        let title

        if( projects.length === 0 ) {
            title = `My Project`
        } else if( projects.length === 1 ) {
            const oldIndex = projects[projects.length-1].title.match( /[0-9]+/gm )
            if( oldIndex ) {
                title = `My Project ${ Number( oldIndex[0] ) + 1}`
            } else {
                title = `My Project 1`
            }
        } else {
            const oldIndex = projects[projects.length-1].title.match( /[0-9]+/gm )
            if( oldIndex ) {
                title = `My Project ${ Number( oldIndex[0] ) + 1}`
            } else {
                title = `Name will be realize coming soon!`
            }
        }

        const id = Date.now()
        const siteURL = `project${id}.tilda.ws`

        const newProject = {
            id,
            title,
            siteURL,
            settings: {},
            pagesList: []
        }

        await request( 'http://localhost:8081/projects', 'POST', newProject )
            .then( fetchProjects() )
            .catch( error => console.log( error ) )
    }

    return {createProject}
}