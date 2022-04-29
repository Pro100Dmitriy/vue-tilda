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


const isUnique = ( array, value ) => {
    const candidate = array.filter( item => item.title === value )
    if( candidate ) {
        return false
    } else {
        return true
    }
}


export {
    isUnique
}
export default http