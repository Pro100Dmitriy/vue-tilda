<template>
    <div class="tabs-content__item"
         :class="{ 'tab-content-active': isSelected }">
      <div class="tabs-content__item-wrapper"
           ref="itemWrapper">
        <slot/>
        <div class="tab-submit">
          <div class="tab-submit__left">
            <a class="tab-submit__link" href="#">Move to the page properties</a>
          </div>
          <div class="tab-submit__right">
            <FillButton class="tab-submit__button fill-button_stroke"
                        ariaLabel="Close popup"
                        @click.prevent="closePageSettingsPopup">Close</FillButton>
            <FillButton class="tab-submit__button"
                        ariaLabel="Close popup"
                        @click.prevent="saveClosePageSettingsPopup">Save changes</FillButton>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

import FillButton from "@/components/UI/FillButton"

export default {
  name: "PopupTab",

  props: {
    isSelected: { type: Boolean },
    setHeight: { type: Function }
  },

  components: {
    FillButton
  },

  methods: {
    ...mapMutations( {
      closePageSettingsPopup: 'projectPage/closePageSettingsPopup',
      saveClosePageSettingsPopup: 'projectPage/saveClosePageSettingsPopup'
    } )
  }
}
</script>