<template>
  <li class="controls-list__item">
    <button class="controls-list__button"
            @click.prevent="handler">
      <svg v-sprite="svgSetting"></svg>
      {{ title }}
    </button>
  </li>
</template>

<script>
export default {
  name: "ControlsListItem",

  props: {
    svgSetting: { type: Object, required: true },
    title: { type: String, required: true },
    handler: { type: Function }
  }
}
</script>