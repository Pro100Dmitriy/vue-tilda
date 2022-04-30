<template>
  <li class="info-buttons-list__item">
    <button class="info-buttons-list__button">
      <svg v-sprite="svgSetting"></svg>
      {{ title }}
    </button>
  </li>
</template>

<script>
export default {
  name: "ButtonListItem",

  props: {
    svgSetting: { type: Object, required: true },
    title: { type: String, required: true }
  }
}
</script>