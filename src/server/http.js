const http = (
    url,
    method = 'GET',
    body = {},
    headers = { 'Content-Type': 'application/json' }
) => {
    return new Promise( (resolve, reject) => {
        const response = fetch( url, {method, body: body ? JSON.stringify( body ) : false, headers} )
        if( response ) {
            resolve( response )
        }else{
            reject()
        }
    } )
}

export default http