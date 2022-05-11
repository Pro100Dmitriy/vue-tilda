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
                      :key="img.id">
                    <img :src="img.urls.regular"
                         @click="selectImage"
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
            <div class="yourself__top">
              <input class="yourself__file-input"
                     ref="fileInput"
                     @change="sendFiles"
                     type="file"
                     hidden
                     accept="image/jpeg"
                     multiple>
              <div class="yourself__uploader"
                   @drop="uploadFiles">
                <div class="yourself__uploader-title">
                  <h6>Drop files here to upload</h6>
                </div>
                <FillButton class="yourself__upload-btn"
                            ariaLabel="Upload file"
                            @click="uploadFiles">Upload file</FillButton>
              </div>
            </div>
            <div class="yourself__bottom">
              <div class="yourself__bottom-title">
                <h4>Uploaded images</h4>
              </div>
              <div class="yourself__saved">
                <div v-if="!hostFilesLoading && !hostFilesError && hostFiles.length"
                     class="yourself__saved-hid-scroll">
                  <div v-for="file of hostFiles"
                       :key="file.name"
                       class="yourself__item">
                    <img :src="file.url" :alt="file.name">
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

import FormConstructor from "@/components/popups/FormConstructor"

import * as animationLoadingLottie from "@/assets/img/json/loader.json";
import * as animationErrorLottie from "@/assets/img/json/error.json";
import * as animationEmptyLottie from "@/assets/img/json/empty.json";

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

      formSearch: {
        query: {type: 'input', propName: 'query', inputId: 'image-select-query', inputLabel: 'Your query', inputValue: ''}
      },

      selectedUrl: '',
      searchQuery: '',

      hostFilesLoading: true,
      hostFilesError: false,
      hostFiles: [],
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
    async getImages() {
      await this.fetchPhotosFromUnsplash( this.searchQuery )
      this.firebase.onFetching()
        .then( res => {
          Promise.all(res)
            .then( res => {
              this.hostFiles = res
              this.hostFilesLoading = false
            } )
            .catch( error => {
              this.hostFilesError = true
              this.hostFilesLoading = false
              console.error( 'Promise all', error )
            } )
        } )
    },
    searchImageQuery( {query} ) {
      this.searchQuery = query
      this.fetchPhotosFromUnsplash( this.searchQuery )
    },
    selectImage( event ) {
      this.selectedUrl = event.target.getAttribute('src')
    },
    returnSelectedImage() {
      this.$emit('getSelectedImage', this.selectedUrl)
    },
    handleAnimation( anim ) {
      this.anim = anim
    },
    uploadFiles() {
      this.$refs.fileInput.click()
    },
    sendFiles( event ) {
      if( !event.target.files.length )
        return

      const files = Array.from( event.target.files )
      this.uploadedFiles = files

      files.forEach( file => {
        if( !file.type.match('image') )
          return

        const reader = new FileReader()

        reader.onload = readEvent => {
          if( this.uploadedFiles.length === files.length ) {
            Promise.all( this.firebase.onUpload(this.uploadedFiles) )
              .then( snapshot => {
                console.log( snapshot )
                console.log('Uploaded a blob or file!');
                this.hostFiles.push( {
                  name: file.name,
                  url: readEvent.target.result
                } )
              } )
              .catch( error => console.error( error ) )
          }
        }

        reader.readAsDataURL(file)
      } )
    }
  },

  computed: {
    ...mapState( {
      imgList: state => state.projectPage.imgList,
      imgListLoading: state => state.projectPage.imgListLoading,
      imgListError: state => state.projectPage.imgListError
    } )
  },

  watch: {
    show( visibility ) {
      if( visibility )
        this.getImages()
    }
  }
}
</script>