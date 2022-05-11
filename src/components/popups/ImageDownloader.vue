<template>
  <div class="image-select-modals"
       :class="{'image-select-modals_open': show}">
    <div class="image-select-modals__wrapper">
      <div class="image-select-modals__bg"
           @click="closeImageSelector"></div>
      <div class="image-select-modals__content">
        <div class="image-select-modals__images">
          <div class="image-select-modals__form">
            <FormConstructor :formData="formSearch"
                             @changeData="searchImageQuery"/>
          </div>
          <ul v-if="imgList.length && !imgListLoading && !imgListError"
              class="image-select-modals__list">
            <li v-for="img of imgList"
                class="image-select-modals__item"
                :class="{'img-selected': img.urls.regular === selectedUrl}"
                :key="img.id">
              <img :src="img.urls.regular"
                   @click="selectImage"
                   :alt="img.alt_description">
            </li>
          </ul>

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
        <FillButton class="image-select-modals__button"
                    ariaLabel="Close popup"
                    @click="returnSelectedImage">Select</FillButton>
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
      searchQuery: ''
    }
  },

  inject: ['closeImageSelector'],

  components: {
    FormConstructor
  },

  methods: {
    ...mapActions( {
      fetchPhotosFromUnsplash: 'projectPage/fetchPhotosFromUnsplash'
    } ),
    async getImages() {
      await this.fetchPhotosFromUnsplash( this.searchQuery )
    },
    searchImageQuery( {query} ) {
      console.log( query )
      this.searchQuery = query
      // this.fetchPhotosFromUnsplash( this.searchQuery )
    },
    selectImage( event ) {
      this.selectedUrl = event.target.getAttribute('src')
    },
    returnSelectedImage() {
      this.$emit('getSelectedImage', this.selectedUrl)
    },
    handleAnimation( anim ) {
      this.anim = anim
    }
  },

  computed: {
    ...mapState( {
      imgList: state => state.projectPage.imgList,
      imgListLoading: state => state.projectPage.imgListLoading,
      imgListError: state => state.projectPage.imgListError
    } ),
  },

  watch: {
    show( visibility ) {
      if( visibility )
        this.getImages()
    }
  }
}
</script>

<style scoped>

</style>