import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, getMetadata } from 'firebase/storage'

export default {
    install(app, firebaseConfig) {
        const firebase = initializeApp(firebaseConfig)
        const storage = getStorage()
        const refCopy = ref

        const onUpload = (files) => {
            console.log( files )
            files.forEach( file => {
                const ref = refCopy(storage, `images/${file.name}`)
                uploadBytes(ref, file)
                    .then( snapshot => {
                        console.log( snapshot )
                        console.log('Uploaded a blob or file!');
                    } );
            } )
        }

        const onFetching = () => {
            return new Promise( (resolve, reject) => {
                const listRef = refCopy(storage, 'images')
                listAll(listRef)
                    .then( res => {
                        try {
                            const images = res.items.map( async itemRef => {
                                const metadata = await getMetadata( itemRef )
                                const url = await getDownloadURL( itemRef )
                                return {
                                    ...metadata,
                                    url
                                }
                            } )
                            resolve(images)
                        } catch(error) {
                            console.log( 'Error connected with metadata', error )
                            reject(error)
                        }
                    } )
                    .catch( error => console.log( 'Uh-oh, an error occurred!', error ) )
            } )
        }

        const firebaseApp = {
            instance: firebase,
            onUpload,
            onFetching
        }

        app.provide('firebase', firebaseApp)
    }
}