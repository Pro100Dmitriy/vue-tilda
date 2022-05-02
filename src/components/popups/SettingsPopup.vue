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
        <div class="popup-content__tabs">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import CrossButton from "@/components/UI/CrossButton"

export default {
  name: "SettingsPopup",

  components: {
    CrossButton
  },

  computed: mapState( {
    pageSettingsPopup: state => state.projectPage.pageSettingsPopup,
    pageActiveId: state => state.projectPage.pageActiveId
  } ),

  methods: mapMutations( {
    closePageSettingsPopup: 'projectPage/closePageSettingsPopup'
  } )
}
</script>