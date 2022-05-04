<template>
  <div :class="pageSettingsPopup ? 'settings-popup settings-popup_open' : 'settings-popup' ">
    <div class="settings-popup__wrapper">
      <div class="settings-popup__bg"></div>
      <div class="popup-content">
        <div class="popup-content__top">
          <div class="popup-content__title">Page settings</div>
          <div class="popup-content__closer">
            <CrossButton class="popup-content__cross"
                         title="Open settings"
                         @click.prevent="closePageSettingsPopup"/>
          </div>
        </div>
        <div class="tabs popup-content__tabs">
          <PopupTabNav :tabsNav="tabsNav"
                       :selected="selected"
                       @selected="setSelected"/>
          <div class="tabs-content">
            <div class="tabs-content__wrapper">
              <PopupTab :isSelected="selected === 'Main'">
                <form class="tab-form" method="POST">
                  <InputTextGroup inputId="page-title"
                                  inputLabel="Title"/>
                  <InputTextGroup inputId="page-description"
                                  inputLabel="Description"/>
                  <InputTextGroup inputId="page-link"
                                  inputLabel="Link"/>
                </form>
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
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import PopupTabNav from "@/components/popups/PopupTabNav"
import PopupTab from "@/components/popups/PopupTab"

import imgTest from '@/assets/img/testImg.jpg'

export default {
  name: "SettingsPopup",

  data() {
    return {
      tabsNav: ['Main', 'Preview'],
      selected: 'Main',
      imgUrl: imgTest
    }
  },

  components: {
    PopupTabNav, PopupTab
  },

  computed: mapState( {
    pageSettingsPopup: state => state.projectPage.pageSettingsPopup,
    pageActiveId: state => state.projectPage.pageActiveId
  } ),

  methods: {
    ...mapMutations({
      closePageSettingsPopup: 'projectPage/closePageSettingsPopup'
    }),
    setSelected( tab ) {
      this.selected = tab
    }
  }
}
</script>