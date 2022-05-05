<template>
  <div class="input-group"
       :class="{ 'input-group_focus': inputFocus }">
    <label class="input-group__label"
           :class="{ 'input-active': modelValue !== '' || inputFocus }"
           :for="inputId">{{ inputLabel }}</label>
    <input class="input-group__input"
           :id="inputId"
           type="text"
           @focus="inputFocus = true"
           @blur="inputFocus = false"
           @input="onInput"
           :value="modelValue">
  </div>
</template>

<script>
export default {
  name: "InputTextGroup",

  props: {
    inputId: { type: String, required: true },
    inputLabel: { type: String, required: true },
    modelValue: [ String, Number ]
  },

  data() {
    return {
      inputFocus: false
    }
  },

  methods: {
    onInput( event ) {
      this.$emit('changeChecker')
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>