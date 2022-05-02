<template>
  <ul class="controls-list">
    <ControlsListItem v-for="item of buttonList"
                      :svgSetting="item.svgIcon"
                      :title="item.title"
                      :handler="item.handler"
                      :key="item.id"/>
  </ul>
</template>

<script>
import ControlsListItem from "@/components/ControlsList/ControlsListItem"

export default {
  name: "ControlsList",

  props: {
    buttonList: { type: Array, required: true }
  },

  components: {
    ControlsListItem
  }
}
</script>