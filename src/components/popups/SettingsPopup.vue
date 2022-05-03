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
          <div class="tabs-name">
            <ul class="tabs-name__list">
              <li class="tabs-name__item">
                <a class="tabs-name__link tab-name-active"
                   data-tab="tab-main"
                   href="#"
                   @click.prevent="changeTab">Main</a>
              </li>
              <li class="tabs-name__item">
                <a class="tabs-name__link"
                   data-tab="tab-preview"
                   href="#"
                   @click.prevent="changeTab">Preview</a>
              </li>
            </ul>
          </div>
          <div class="tabs-content">
            <div class="tabs-content__wrapper">
              <div class="tabs-content__item tab-content-active" id="tab-main">
                <form class="tab-form" method="POST">
                  <div class="input-group">
                    <label class="input-group__label" for="page-title">Title</label>
                    <input class="input-group__input" id="page-title" value="" type="text">
                  </div>
                  <div class="input-group">
                    <label class="input-group__label" for="page-description">Description</label>
                    <input class="input-group__input" id="page-description" value="" type="text">
                  </div>
                  <div class="input-group">
                    <label class="input-group__label" for="page-link">Link</label>
                    <input class="input-group__input" id="page-link" value="" type="text">
                  </div>
                </form>
                <div class="tab-submit">
                  <div class="tab-submit__left">
                    <a class="tab-submit__link" href="#">Move to the page properties</a>
                  </div>
                  <div class="tab-submit__right">
                    <FillButton class="tab-submit__button fill-button_stroke" ariaLabel="Close popup">Close</FillButton>
                    <FillButton class="tab-submit__button" ariaLabel="Close popup">Save changes</FillButton>
                  </div>
                </div>
              </div>
              <div class="tabs-content__item" id="tab-preview">
                <div class="tab-uploader">
                  <div class="tab-uploader__desc">
                    <h4>Current preview image</h4>
                    <p>By default, the first image on the page is used for the badge. You can upload your own image.</p>
                    <input type="file">
                    <button>Upload file</button>
                  </div>
                  <div class="tab-uploader__image-wrapper">
                    <img class="tab-uploader__image" src="" alt="">
                  </div>
                </div>
                <div class="tab-submit">
                  <div class="tab-submit__left">
                    <a class="tab-submit__link" href="#">Move to the page properties</a>
                  </div>
                  <div class="tab-submit__right">
                    <FillButton class="tab-submit__button fill-button_stroke" ariaLabel="Close popup">Close</FillButton>
                    <FillButton class="tab-submit__button" ariaLabel="Close popup">Save changes</FillButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import CrossButton from "@/components/UI/CrossButton"
import FillButton from "@/components/UI/FillButton"

export default {
  name: "SettingsPopup",

  data() {
    return {
      tabList: [
        {id: 1, tabName: 'Main'},
        {id: 2, tabName: 'Preview'}
      ]
    }
  },

  components: {
    CrossButton, FillButton
  },

  computed: mapState( {
    pageSettingsPopup: state => state.projectPage.pageSettingsPopup,
    pageActiveId: state => state.projectPage.pageActiveId
  } ),

  methods: {
    ...mapMutations({
      closePageSettingsPopup: 'projectPage/closePageSettingsPopup'
    }),
    changeTab({ target }) {
      console.log( target )
    }
  }
}
</script>