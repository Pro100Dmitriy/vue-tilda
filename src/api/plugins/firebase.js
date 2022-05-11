import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, getMetadata } from 'firebase/storage'

export default {
    install(app, firebaseConfig) {
        const firebase = initializeApp(firebaseConfig)
        const storage = getStorage()
        const refCopy = ref

        const onUpload = (files) => {
            return files.map( file => {
                const ref = refCopy(storage, `images/${file.name}`)
                return uploadBytes(ref, file)
            } )
        }

        const onFetching = () => {
            return new Promise( (resolve, reject) => {
                const listRef = refCopy(storage, 'images')
                listAll(listRef)
                    .then( res => {
                        const images = res.items.map( async itemRef => {
                            const metadata = await getMetadata( itemRef )
                            const url = await getDownloadURL( itemRef )
                            return {
                                ...metadata,
                                url
                            }
                        } )
                        resolve(images)
                    } )
                    .catch( error => reject(error) )
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