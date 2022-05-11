<template>
  <div class="input-group"
       :class="{ 'input-group_focus': inputFocus,
                 'input-group_error': inputError }">
    <label class="input-group__label"
           :class="{ 'input-active': modelValue !== '' || inputFocus }"
           :for="inputId">{{ inputLabel }}</label>
    <input class="input-group__input"
           :id="inputId"
           type="text"
           @focus="onFocus"
           @blur="onBlur"
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
    modelValue: [ String, Number ],
    handler: { type: Function }
  },

  data() {
    return {
      inputFocus: false,
      inputError: false
    }
  },

  methods: {
    onInput( event ) {
      if( this.handler )
        this.inputError = this.handler( event.target.value )

      this.$emit('changeChecker')
      this.$emit('update:modelValue', event.target.value)
    },
    onFocus() {
      this.inputFocus = true
      this.$emit('focusChecker')
    },
    onBlur() {
      this.inputFocus = false
      this.$emit('blurChecker')
    }
  }
}
</script>