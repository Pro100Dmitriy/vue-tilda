<template>
  <button class="plus-button" :disabled="disabled ?? false">
    <svg class="plus-button__svg" width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <g>
        <polygon style="fill:#fff;" points="26.79 13 17 13 17 3.21 13 3.21 13 13 3.21 13 3.21 17 13 17 13 26.79 17 26.79 17 17 26.79 17 26.79 13"></polygon>
      </g>
    </svg>
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "PlusButton",
  props: {
    title: { type: String, required: true },
    disabled: { type: Boolean }
  }
}
</script>