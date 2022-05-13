import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytesResumable, listAll, getDownloadURL, getMetadata, deleteObject  } from 'firebase/storage'

export default {
    install(app, firebaseConfig) {
        const firebase = initializeApp(firebaseConfig)
        const storage = getStorage()
        const refCopy = ref

        const onUpload = ( files, inTheProgress, inTheError, inTheEnd ) => {
            return files.map( file => {
                const ref = refCopy(storage, `images/${file.name}`)
                const uploadTask = uploadBytesResumable(ref, file)

                uploadTask.on('state_changed',
                    // Progress
                    snapshot => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if( inTheProgress )
                            inTheProgress( progress )
                    },
                    // Error
                    error => {
                        if( inTheError )
                            inTheError( error )
                    },
                    // Complete
                    () => {
                        if(inTheEnd)
                            inTheEnd()
                    }
                )

                return uploadTask
            } )
        }

        const onFetch = () => {
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

        const onDelete = ( name ) => {
            const ref = refCopy(storage, `images/${name}`)
            return deleteObject(ref)
        }

        const firebaseApp = {
            instance: firebase,
            onUpload,
            onFetch,
            onDelete
        }

        app.provide('firebase', firebaseApp)
    }
}