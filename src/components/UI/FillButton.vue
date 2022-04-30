<template>
  <button class="fill-button"
          :aria-label="ariaLabel">
    <img v-if="iconSrc"
         :src="iconSrc"
         alt="Button icon"
         aria-hidden="true">
    <svg v-else-if="svgSetting"
         v-sprite="svgSetting"></svg>
    <slot/>
  </button>
</template>

<script>
export default {
  name: "FillButton",

  props: {
    iconSrc: { type: String },
    svgSetting: { type: Object },
    ariaLabel: { type: String, required: true }
  }
}
</script>