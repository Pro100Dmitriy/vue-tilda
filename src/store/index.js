import { createStore } from 'vuex'

import keys from '@/api/keys'

import mainPageStore from '@/store/modules/mainPage'
import projectPageStore from '@/store/modules/projectPage'
import editPageStore from '@/store/modules/editPage'

const store = createStore({
    modules: {
        mainPage: mainPageStore,
        projectPage: projectPageStore,
        editPage: editPageStore
    },
    actions: {
        async fetchPhotosFromUnsplash( {commit}, query ) {
            try {
                commit('updateFetching')
                let mainQuery = query === '' ? 'mountain' : query
                const response = await fetch( `https://api.unsplash.com/search/photos?query=${mainQuery}&client_id=${keys.unsplashApiKey}` )
                if( !response.ok )
                    throw new Error('Error => "@/store/index" => fetchPhotosFromUnsplash( {commit}, query )')

                const data = await response.json()
                commit('savePhotos', data)

            }catch(error){
                commit('errorFetching')
            }
        },
    },
    mutations: {
        updateFetching( state ) {
          state.photosLoading = true
          state.photosError = false
          state.photosList = []
        },
        savePhotos( state, data ) {
            state.photosLoading = false
            state.photosError = false
            state.photosList = data.results
        },
        errorFetching( state ) {
            state.photosLoading = false
            state.photosError = true
            state.photosList = []
        }
    },
    state: {
        photosList: [],
        photosLoading: true,
        photosError: false
    }
})

export default store