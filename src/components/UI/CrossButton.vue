<template>
  <button class="cross-button"
          :aria-label="title">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "CrossButton",

  props: {
    title: { type: String, required: true }
  }
}
</script>