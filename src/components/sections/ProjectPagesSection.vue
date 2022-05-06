<template>
  <section class="project-pages">
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
                            @click.prevent="openImageSeletor">Upload file</button>
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
    <div class="image-select-modals"
         :class="{'image-select-modals_open': imageSelectModalsOpen}">
      <div class="image-select-modals__wrapper">
        <div class="image-select-modals__bg"
             @click="closeImageSelector"></div>
        <div class="image-select-modals__content">
          <div class="image-select-modals__images">
            <ul class="image-select-modals__list">
              <li v-for="img of imgList"
                  class="image-select-modals__item"
                  :class="{'img-selected': img.urls.regular === selectedUrl}"
                  :key="img.id">
                <img :src="img.urls.regular"
                     @click="selectImage"
                     :alt="img.alt_description">
              </li>
            </ul>
          </div>
          <FillButton class="image-select-modals__button"
                      ariaLabel="Close popup"
                      @click="saveSelectImage">Select</FillButton>
        </div>
      </div>
    </div>
    <ContainerWrapper>
      <div class="project-pages__wrapper">
        <div class="project-pages__small">
          <p>Pages:</p>
        </div>
        <div class="project-pages__pages">
          <PageList/>
        </div>
      </div>
    </ContainerWrapper>
  </section>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

import ModalsWrapper from "@/layouts/ModalsWrapper";
import PageList from "@/components/PageList/PageList"
import PopupTabNav from "@/components/popups/PopupTabNav"
import PopupTab from "@/components/popups/PopupTab"
import FormConstructor from "@/components/popups/FormConstructor"

export default {
  name: "ProjectPagesSection",

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
      selectedUrl: '',
      currentMainImg: ''
    }
  },

  provide() {
    return {
      openModals: this.openModals
    }
  },

  components: {
    ModalsWrapper, PageList, PopupTabNav, PopupTab, FormConstructor
  },

  methods: {
    ...mapActions( {
      updatePage: 'projectPage/updatePage',
      fetchPhotosFromUnsplash: 'projectPage/fetchPhotosFromUnsplash'
    } ),
    ...mapMutations( {
      getSelectedPageInfo: 'projectPage/getSelectedPageInfo'
    } ),
    openModals( pageId ) {
      this.getSelectedPageInfo(pageId)

      if( this.getPageActiveInfo ) {
        document.body.style.overflow = 'hidden'
        this.selected = 'Main',

        this.formData.title.inputValue = this.getPageActiveInfo.title
        this.formData.description.inputValue = this.getPageActiveInfo.description
        this.formData.URL.inputValue = this.getPageActiveInfo.URL
        this.currentMainImg = this.getPageActiveInfo.prevImage

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
      }, 300 )
    },
    saveAndCloseModals() {
      document.body.style.overflow = 'auto'
      this.showModals = false

      this.updatePage( [this.getPageActiveInfo.projectId, this.getPageActiveInfo.pageId, this.dataForSave] )

      setTimeout( () => {
        this.dataForSave = {}
        this.modalLoad = true
      }, 300 )
    },
    setSelected( tab ) {
      this.selected = tab
    },
    changeData( value ) {
      this.dataForSave = value
    },
    async openImageSeletor() {
      this.imageSelectModalsOpen = true
      this.fetchPhotosFromUnsplash()
    },
    closeImageSelector() {
      this.imageSelectModalsOpen = false
    },
    selectImage( event ) {
      this.selectedUrl = event.target.getAttribute('src')
    },
    saveSelectImage() {
      this.currentMainImg = this.selectedUrl
      this.imageSelectModalsOpen = false
    },
    saveAndCloseImageTabModals() {
      document.body.style.overflow = 'auto'
      this.showModals = false

      const newImage = {
        prevImage: this.currentMainImg
      }

      this.updatePage( [this.getPageActiveInfo.projectId, this.getPageActiveInfo.pageId, newImage] )

      setTimeout( () => {
        this.currentMainImg = ''
        this.modalLoad = true
      }, 300 )
    }
  },

  computed: {
    ...mapState( {
      imgList: state => state.projectPage.imgList,
      imgListLoading: state => state.projectPage.imgListLoading,
      imgListError: state => state.projectPage.imgListError
    } ),
    ...mapGetters( {
      getPageActiveInfo: 'projectPage/getPageActiveInfo'
    } )
  }
}
</script>