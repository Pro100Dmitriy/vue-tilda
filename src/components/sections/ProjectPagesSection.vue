<template>
  <div class="project-pages">
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
              </PopupTab>
              <PopupTab :isSelected="selected === 'Preview'">
                <div class="tab-uploader">
                  <div class="tab-uploader__desc">
                    <h4 class="tab-uploader__desc-title">Current preview image</h4>
                    <p class="tab-uploader__desc-paragraph">By default, the first image on the page is used for the badge. You can upload your own image.</p>
                    <input type="file" hidden>
                    <button class="tab-uploader__desc-button">Upload file</button>
                  </div>
                  <div class="tab-uploader__image-wrapper">
                    <img class="tab-uploader__image" :src="imgUrl" alt="Test Image">
                  </div>
                </div>
              </PopupTab>
            </div>
          </div>
        </div>

      </div>
    </ModalsWrapper>
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
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import ModalsWrapper from "@/layouts/ModalsWrapper";
import PageList from "@/components/PageList/PageList"
import PopupTabNav from "@/components/popups/PopupTabNav"
import PopupTab from "@/components/popups/PopupTab"
import FormConstructor from "@/components/popups/FormConstructor"
import imgTest from "@/assets/img/testImg.jpg";

export default {
  name: "ProjectPagesSection",

  data() {
    return {
      tabsNav: ['Main', 'Preview'],
      selected: 'Main',
      imgUrl: imgTest,
      formData: {
        title: {type: 'input', propName: 'title', inputId: 'page-title', inputLabel: 'Title', inputValue: '', handler: ''},
        description: {type: 'input', propName: 'description', inputId: 'page-description', inputLabel: 'Description', inputValue: '', handler: ''},
        URL: {type: 'input', propName: 'URL', inputId: 'page-URL', inputLabel: 'URL', inputValue: '', handler: ''}
      },
      dataForSave: {},
      showModals: false,
      modalLoad: true
    }
  },

  provide() {
    return {
      openModals: this.openModals,
      closeModals: this.closeModals,
      saveAndCloseModals: this.saveAndCloseModals
    }
  },

  components: {
    ModalsWrapper, PageList, PopupTabNav, PopupTab, FormConstructor
  },

  methods: {
    ...mapActions( {
      updatePage: 'projectPage/updatePage'
    } ),
    ...mapMutations( {
      getSelectedPageInfo: 'projectPage/getSelectedPageInfo'
    } ),
    openModals( pageId ) {
      this.getSelectedPageInfo(pageId)

      if( this.getPageActiveInfo ) {
        document.body.style.overflow = 'hidden'
        this.formData.title.inputValue = this.getPageActiveInfo.title
        this.formData.description.inputValue = this.getPageActiveInfo.description
        this.formData.URL.inputValue = this.getPageActiveInfo.URL
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
  },

  computed: {
    ...mapGetters( {
      getPageActiveInfo: 'projectPage/getPageActiveInfo'
    } )
  }
}
</script>