import server from "@/api/server"

export default {
    actions: {
        async saveLayout( {dispatch}, [pageId, layout] ) {
            const { request } = server()
            const pageData = await request( `http://localhost:8081/pages/${pageId}` )
            if( !pageData )
                throw new Error('Error in save layout')

            pageData.layout = layout

            await request( `http://localhost:8081/pages/${pageId}`, 'PUT', pageData )
            dispatch('fetchPageInfo', pageId)
        }
    }
}