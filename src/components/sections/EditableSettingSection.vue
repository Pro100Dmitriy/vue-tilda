<template>
  <ModalsWrapper :show="showModals"
                 titleModal="Project settings"
                 :closeFunction="closeModals">
    <div v-if="!modalLoad"
         class="project-pages__modals">

      <div class="tabs">
        <PopupTabNav :tabsNav="tabsNav"
                     :selected="selected"
                     @selected="setSelected"/>
        <div class="tabs-content">
          <div class="tabs-content__wrapper">
            <PopupTab :isSelected="selected === 'Main'">
              <FormConstructor :formData="formData"
                               @changeData="changeData"/>
              <div class="tab-submit">
                <div class="tab-submit__left">
                  <a class="tab-submit__link" href="#">Move to the page properties</a>
                </div>
                <div class="tab-submit__right">
                  <FillButton class="tab-submit__button fill-button_stroke"
                              ariaLabel="Close popup"
                              @click.prevent="closeModals">Close</FillButton>
                  <FillButton class="tab-submit__button"
                              ariaLabel="Close popup"
                              @click.prevent="saveAndCloseModals">Save changes</FillButton>
                </div>
              </div>
            </PopupTab>
            <PopupTab :isSelected="selected === 'Preview'">
              <div class="tab-uploader">
                <div class="tab-uploader__desc">
                  <h4 class="tab-uploader__desc-title">Current preview image</h4>
                  <p class="tab-uploader__desc-paragraph">By default, the first image on the page is used for the badge. You can upload your own image.</p>
                  <input type="file" hidden>
                  <button class="tab-uploader__desc-button"
                          @click.prevent="openImageSelector">Upload file</button>
                </div>
                <div class="tab-uploader__image-wrapper">
                  <img class="tab-uploader__image" :src="currentMainImg" alt="Test Image">
                </div>
              </div>
              <div class="tab-submit">
                <div class="tab-submit__left">
                  <a class="tab-submit__link" href="#">Move to the page properties</a>
                </div>
                <div class="tab-submit__right">
                  <FillButton class="tab-submit__button fill-button_stroke"
                              ariaLabel="Close popup"
                              @click.prevent="closeModals">Close</FillButton>
                  <FillButton class="tab-submit__button"
                              ariaLabel="Close popup"
                              @click.prevent="saveAndCloseImageTabModals">Save changes</FillButton>
                </div>
              </div>
            </PopupTab>
          </div>
        </div>
      </div>

    </div>
  </ModalsWrapper>
  <ImageDownloader :show="imageSelectModalsOpen"
                   @getSelectedImage="saveSelectImage"/>
</template>

<script>
import {mapActions, mapState} from 'vuex'

import ModalsWrapper from "@/layouts/ModalsWrapper"
import PopupTabNav from "@/components/popups/PopupTabNav"
import PopupTab from "@/components/popups/PopupTab"
import FormConstructor from "@/components/popups/FormConstructor"
import ImageDownloader from "@/components/popups/ImageDownloader"

export default {
  name: "EditableSettingSection",

  props: {
    show: { type: Boolean, required: true }
  },

  data() {
    return {
      tabsNav: ['Main', 'Preview'],
      selected: 'Main',
      formData: {
        title: {type: 'input', propName: 'title', inputId: 'page-title', inputLabel: 'Title', inputValue: ''},
        description: {type: 'input', propName: 'description', inputId: 'page-description', inputLabel: 'Description', inputValue: ''},
        URL: {type: 'input', propName: 'URL', inputId: 'page-URL', inputLabel: 'URL', inputValue: ''}
      },
      dataForSave: {},
      showModals: false,
      modalLoad: true,

      imageSelectModalsOpen: false,
      currentMainImg: ''
    }
  },

  provide() {
    return {
      openModals: this.openModals,
      closeImageSelector: this.closeImageSelector
    }
  },

  inject: ['closePageSettings', 'closeAndSavePageSettings'],

  components: {
    ModalsWrapper, PopupTabNav, PopupTab, FormConstructor, ImageDownloader
  },

  methods: {
    ...mapActions( {
      pageUpdateAndFetch: 'editPage/pageUpdateAndFetch',
    } ),
    openModals() {
      if( this.pageInfo ) {
        document.body.style.overflow = 'hidden'
        this.selected = 'Main'

        this.formData.title.inputValue = this.pageInfo.title
        this.formData.description.inputValue = this.pageInfo.description
        this.formData.URL.inputValue = this.pageInfo.URL
        this.currentMainImg = this.pageInfo.prevImage

        this.modalLoad = false
        this.showModals = true
      }
    },
    closeModals() {
      document.body.style.overflow = 'auto'
      this.showModals = false
      setTimeout( () => {
        this.dataForSave = {}
        this.modalLoad = true
        this.closePageSettings()
      }, 300 )
    },
    saveAndCloseModals() {
      document.body.style.overflow = 'auto'
      this.showModals = false

      this.pageUpdateAndFetch( [this.pageInfo.projectId, this.pageInfo.id, this.dataForSave] )

      setTimeout( () => {
        this.dataForSave = {}
        this.modalLoad = true
        this.closeAndSavePageSettings()
      }, 300 )
    },
    setSelected( tab ) {
      this.selected = tab
    },
    changeData( value ) {
      this.dataForSave = value
    },
    openImageSelector() {
      this.imageSelectModalsOpen = true
    },
    closeImageSelector() {
      this.imageSelectModalsOpen = false
    },
    saveSelectImage( selectedUrl ) {
      if( selectedUrl ) {
        this.currentMainImg = selectedUrl
      }
      this.imageSelectModalsOpen = false
    },
    saveAndCloseImageTabModals() {
      document.body.style.overflow = 'auto'
      this.showModals = false

      const newImage = {
        prevImage: this.currentMainImg
      }

      this.pageUpdateAndFetch( [this.pageInfo.projectId, this.pageInfo.id, newImage] )

      setTimeout( () => {
        this.currentMainImg = ''
        this.modalLoad = true
      }, 300 )
    }
  },

  computed: {
    ...mapState( {
      pageInfo: state => state.editPage.pageInfo,
    } )
  },

  watch: {
    show( value ) {
      if( value )
        this.openModals()
    }
  }
}
</script>