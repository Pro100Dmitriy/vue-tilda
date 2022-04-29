const http = (
    url,
    method = 'GET',
    body = null,
    headers = { 'Content-Type': 'application/json' }
) => {
    return new Promise( (resolve, reject) => {
        const response = fetch( url, {method, body: body ? JSON.stringify( body ) : null, headers} )
        if( response ) {
            resolve( response )
        }else{
            reject()
        }
    } )
}

export default http