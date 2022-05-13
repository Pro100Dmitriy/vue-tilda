<template>
  <div class="image-select-modals"
       :class="{'image-select-modals_open': show}">
    <div class="image-select-modals__wrapper">
      <div class="image-select-modals__bg"
           @click="closeImageSelector"></div>
      <div class="image-select-modals__content">

        <div class="image-select-modals__columns">
          <div class="unsplash">
            <div class="unsplash__form">
              <FormConstructor :formData="formSearch"
                               @blurInput="searchImageQuery"
                               @submitForm="searchImageQuery"/>
            </div>
            <div class="unsplash__images">
              <div v-if="imgList.length && !imgListLoading && !imgListError"
                   class="unsplash__hidden-scroll">
                <ul class="unsplash__list">
                  <li v-for="img of imgList"
                      class="unsplash__item"
                      :class="{'img-selected': img.urls.regular === selectedUrl}"
                      :key="img.id"
                      @click="selectImage(img.urls.regular)">
                    <img :src="img.urls.regular"
                         :alt="img.alt_description">
                  </li>
                </ul>
              </div>

              <div class="empty"
                   v-else-if="!imgListLoading && !imgListError && !imgList.length">
                <LottieConstructor :options="lottieEmptyOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
                <div class="empty__subscribe">
                  <h2>Projects are not created, click the "Create a new project"</h2>
                </div>
              </div>

              <div class="error"
                   v-else-if="imgListError">
                <LottieConstructor :options="lottieErrorOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
              </div>

              <div class="loader"
                   v-else>
                <LottieConstructor :options="lottieLoadingOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
              </div>
            </div>
          </div>
          <div class="yourself">
            <div class="yourself__wrapper">
              <div class="yourself__top">
                <input class="yourself__file-input"
                       ref="fileInput"
                       @change="event => sendFiles(Array.from( event.target.files ))"
                       type="file"
                       hidden
                       accept="image/jpeg"
                       multiple>
                <div class="drop-zone"
                     :class="{'drop-zone_active': isDragOver}"
                     ref="dropZone"
                     @drop.prevent="dropZone"
                     @dragover.prevent.stop="this.isDragOver = true"
                     @dragleave.prevent.stop="this.isDragOver = false">
                  <div class="drop-zone__animation">
                    <LottieConstructor :options="lottieCatchOptions" :width="150" :height="150" @animCreated="handleAnimation"/>
                  </div>
                  <div class="drop-zone__content">
                    <div class="drop-zone__title"
                         @dragleave.prevent.stop="this.isDragOver = true"
                         @dragover.prevent.stop="this.isDragOver = true">
                      <h6>Drop files here to upload</h6>
                    </div>
                    <FillButton class="drop-zone__btn"
                                ariaLabel="Upload file"
                                @dragleave.prevent.stop="this.isDragOver = true"
                                @dragover.prevent.stop="this.isDragOver = true"
                                @click.stop="uploadFiles">Upload file</FillButton>
                  </div>
                </div>
              </div>
              <div class="yourself__bottom">
                <div class="yourself__bottom-title">
                  <h4>Uploaded images</h4>
                </div>
                <div class="yourself__bottom-saved">
                  <div v-if="!hostFilesLoading && !hostFilesError && (hostFiles.length || newFiles.length)"
                       class="yourself__bottom-hid-scroll">

                    <div v-for="file of getHostFiles"
                         :key="file.name"
                         class="image-block yourself__bottom-item"
                         :class="{'image-block__active': file.url === selectedUrl}"
                         @click="selectImage(file.url)">
                      <button class="cross-button image-block__cross"
                              aria-label="Delete image"
                              @click.prevent.stop="deleteFile(file.name)">
                        Delete image
                      </button>
                      <img class="image-block__img"
                           :src="file.url"
                           :alt="file.name">
                    </div>

                    <div v-for="(file,i) of newFiles"
                         :key="i"
                         class="image-block yourself__bottom-item">
                      <div class="image-block__progress"
                           :style="{'height': file.progress+'%'}"></div>
                      <img class="image-block__img" :src="file.url" :alt="file.name">
                    </div>

                  </div>

                  <div class="empty"
                       v-else-if="!hostFilesLoading && !hostFilesError && !hostFiles.length">
                    <LottieConstructor :options="lottieEmptyOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
                    <div class="empty__subscribe">
                      <h2>Projects are not created, click the "Create a new project"</h2>
                    </div>
                  </div>

                  <div class="error"
                       v-else-if="hostFilesError">
                    <LottieConstructor :options="lottieErrorOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
                  </div>

                  <div class="loader"
                       v-else>
                    <LottieConstructor :options="lottieLoadingOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
                  </div>

                </div>
              </div>
            </div>
            <div class="yourself__accept">
              <FillButton class="yourself__accept-btn"
                          ariaLabel="Save selected image"
                          @click="returnSelectedImage">Select</FillButton>
              <FillButton class="yourself__accept-btn fill-button_stroke"
                          ariaLabel="Close popup"
                          @click="closeImageSelector">Close</FillButton>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

import FormConstructor from "@/components/forms/FormConstructor"

import * as animationLoadingLottie from "@/assets/img/json/loader.json"
import * as animationErrorLottie from "@/assets/img/json/error.json"
import * as animationEmptyLottie from "@/assets/img/json/empty.json"
import * as animationCatchLottie from "@/assets/img/json/catching.json"

export default {
  name: "ImageDownloader",

  props: {
    show: { type: Boolean, required: true }
  },

  data() {
    return {
      lottieLoadingOptions: {animationData: animationLoadingLottie},
      lottieErrorOptions: {animationData: animationErrorLottie},
      lottieEmptyOptions: {animationData: animationEmptyLottie},
      lottieCatchOptions: {animationData: animationCatchLottie},

      formSearch: {
        query: {type: 'input', propName: 'query', inputId: 'image-select-query', inputLabel: 'Your query', inputValue: ''}
      },

      selectedUrl: '',
      searchQuery: '',

      isDragOver: false,

      hostFilesLoading: true,
      hostFilesError: false,
      hostFiles: [],
      newFiles: [],
      uploadedFiles: []
    }
  },

  inject: ['firebase', 'closeImageSelector'],

  components: {
    FormConstructor
  },

  methods: {
    ...mapActions( {
      fetchPhotosFromUnsplash: 'projectPage/fetchPhotosFromUnsplash'
    } ),

    async initialize() {
      document.body.style.overflowY = 'hidden'

      await this.fetchPhotosFromUnsplash( this.searchQuery )
      this.fetchPhotosFromFirebase()
    },
    fetchPhotosFromFirebase() {
      if( !this.hostFiles.length && !this.newFiles.length ){
        this.hostFilesLoading = true
        this.hostFilesError = false
      }

      this.firebase.onFetch()
          .then( res => {
            Promise.all(res)
                .then( res => {
                  this.hostFiles = res
                  this.hostFilesLoading = false
                } )
                .catch( () => {
                  this.hostFilesError = true
                  this.hostFilesLoading = false
                } )
          } )
    },
    selectImage( imgUrl ) {
      this.selectedUrl = imgUrl
    },
    returnSelectedImage() {
      this.$emit('getSelectedImage', this.selectedUrl)
      this.closeImageSelector()
      document.body.style.overflowY = 'auto'
    },
    handleAnimation( anim ) {
      this.anim = anim
    },

    searchImageQuery( {query} ) {
      this.searchQuery = query
      this.fetchPhotosFromUnsplash( this.searchQuery )
    },

    dropZone( {dataTransfer} ) {
      this.isDragOver = false
      const dropFiles = []

      if( dataTransfer.items ) {
        for(let item of dataTransfer.items) {
          if (item.kind === 'file') {
            let file = item.getAsFile();
            dropFiles.push(file)
          }
        }
      } else {
        for(let file of dataTransfer.files) {
          dropFiles.push(file)
        }
      }

      this.sendFiles(dropFiles)
    },
    uploadFiles() {
      this.$refs.fileInput.click()
    },
    sendFiles( files ) {
      if( !files.length )
        return

      this.uploadedFiles = files

      files.forEach( (file, i) => {
        if( !file.type.match('image') )
          return


        const reader = new FileReader()

        reader.onload = readEvent => {
          const item = {
            id: i,
            name: file.name,
            url: readEvent.target.result,
            progress: 0
          }

          this.newFiles[i] = ( item )

          const inTheProgress = (progress) => {
            if( this.newFiles[i] )
              this.newFiles[i].progress = 100 - progress
          }

          const inTheError = ( error ) => console.error( error )

          const inTheEnd = () => this.newFiles = []

          if( this.uploadedFiles.length === files.length ) {

            Promise.all( this.firebase.onUpload(this.uploadedFiles, inTheProgress, inTheError, inTheEnd) )
              .then( () => {
                this.fetchPhotosFromFirebase()
              } )
              .catch( error => console.error( error ) )

          }
        }

        reader.readAsDataURL(file)
      } )
    },
    deleteFile( name ) {
      this.firebase.onDelete(name)
        .then( () => {
          this.hostFiles = this.hostFiles.filter( file => file.name !== name )
        } )
    }
  },

  computed: {
    ...mapState( {
      imgList: state => state.projectPage.imgList,
      imgListLoading: state => state.projectPage.imgListLoading,
      imgListError: state => state.projectPage.imgListError
    } ),
    getHostFiles() {
      return this.hostFiles
    }
  },

  watch: {
    show( visibility ) {
      if( visibility )
        this.initialize()
    }
  }
}
</script>