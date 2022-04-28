<template>
  <div :class="!openPopup ? 'setting-popup' : 'setting-popup setting-popup_open'">

    <div class="setting-popup__wrapper">
      <ul class="setting-popup__list">
        <SettingsPopupItem v-for="setting of listSettings"
                           :title="setting.title"
                           :link="setting.link"
                           :method="setting.method"
                           :key="setting.title"/>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import SettingsPopupItem from "@/components/SettingsPopupItem"

export default {
  name: "SettingPopup",

  props: {
    listSettings: { type: Array, required: true },
    openPopup: { type: Boolean }
  },

  computed: mapGetters( ['getOpenPopup'] ),

  components: {
    SettingsPopupItem
  }
}
</script>