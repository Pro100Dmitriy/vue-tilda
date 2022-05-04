<template>
  <div class="input-group"
       :class="{ 'input-group_focus': inputFocus }">
    <label class="input-group__label"
           :class="{ 'input-active': inputValue !== '' }"
           :for="inputId">{{ inputLabel }}</label>
    <input class="input-group__input"
           :id="inputId"
           type="text"
           @focus="inputFocus = true"
           @blur="inputFocus = false"
           v-model="inputValue">
  </div>
</template>

<script>
export default {
  name: "InputTextGroup",

  props: {
    inputId: { type: String, required: true },
    inputLabel: { type: String, required: true }
  },

  data() {
    return {
      inputFocus: false,
      inputValue: ''
    }
  }
}
</script>