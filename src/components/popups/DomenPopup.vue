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

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: "DomenPopup",

  computed: {
    ...mapState( {
      pageSettingsPopup: state => state.projectPage.pageSettingsPopup,
      pageActiveId: state => state.projectPage.pageActiveId
    } )
  },

  methods: {
    ...mapMutations({
      closePageSettingsPopup: 'projectPage/closePageSettingsPopup'
    })
  }
}
</script>