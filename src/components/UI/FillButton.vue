<template>
  <button class="fill-button"
          :aria-label="ariaLabel">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "FillButton",

  props: {
    ariaLabel: { type: String, required: true }
  }
}
</script>