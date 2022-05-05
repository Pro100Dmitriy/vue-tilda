<template>
  <div :class="projectDomenPopup ? 'settings-popup settings-popup_open' : 'settings-popup' ">
    <div class="settings-popup__wrapper">
      <div class="settings-popup__bg"></div>
      <div class="popup-content">
        <div class="popup-content__top">
          <div class="popup-content__title">Add domen name</div>
          <div class="popup-content__closer">
            <CrossButton class="popup-content__cross"
                         title="Open settings"
                         @click.prevent="closeProjectDomenPopup"/>
          </div>
        </div>
        <div class="popup-content__form">
          <FormConstructor :formData="formData"
                           @changeData="changeData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import FormConstructor from "@/components/popups/FormConstructor"

export default {
  name: "DomenPopup",

  data() {
    return {
      formData: [
        {type: 'input', propName: 'domain', inputId: 'page-domain', inputLabel: 'Domain Name', inputValue: 'newpage.com'},
      ]
    }
  },

  components: {
    FormConstructor
  },

  computed: {
    ...mapState( {
      projectDomenPopup: state => state.projectPage.projectDomenPopup
    } )
  },

  methods: {
    ...mapMutations({
      closeProjectDomenPopup: 'projectPage/closeProjectDomenPopup'
    }),
    changeData( value ) {
      console.log( value )
    }
  }
}
</script>