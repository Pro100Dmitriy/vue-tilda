<template>
  <div :class="!openPopup ? 'setting-popup' : 'setting-popup setting-popup_open'">

    <div class="setting-popup__wrapper">
      <ul class="setting-popup__list">
        <ContextPopupItem v-for="setting of listSettings"
                           :title="setting.title"
                           :link="setting.link"
                           :method="setting.method"
                           :key="setting.title"/>
      </ul>
    </div>
  </div>
</template>

<script>
import ContextPopupItem from "@/components/popups/ContextPopupItem"

export default {
  name: "ContextPopup",

  props: {
    listSettings: { type: Array, required: true },
    openPopup: { type: Boolean }
  },

  components: {
    ContextPopupItem
  }

}
</script>