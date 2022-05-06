export const server = () => {
    const request = async (
        url,
        method = 'GET',
        body = null,
        headers = { 'Content-Type': 'application/json' }
    ) => {
        try {
            const response = await fetch( url, {method, body: body ? JSON.stringify( body ) : null, headers} )
            if( !response.ok )
                throw new Error( `Could not fetch ${url}, status: ${response.status}` )

            const data = await response.json()

            return data
        }catch( error ){
            throw new Error( error )
        }
    }

    return {request}
}


export default server