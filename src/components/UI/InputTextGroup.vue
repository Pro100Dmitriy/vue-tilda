<template>
  <div class="input-group"
       :class="{ 'input-group_focus': inputFocus }">
    <label class="input-group__label"
           :class="{ 'input-active': inputValueModel !== '' || inputFocus }"
           :for="inputId">{{ inputLabel }}</label>
    <input class="input-group__input"
           :id="inputId"
           type="text"
           @focus="inputFocus = true"
           @blur="inputFocus = false"
           @input="setChangedData"
           v-model="inputValueModel">
  </div>
</template>

<script>
export default {
  name: "InputTextGroup",

  props: {
    inputId: { type: String, required: true },
    inputLabel: { type: String, required: true },
    inputValue: { type: String, required: true },
    propName: { type: String, required: true }
  },

  data() {
    return {
      inputFocus: false,
      inputValueModel: this.inputValue
    }
  },

  methods: {
    setChangedData() {
      this.$emit('changeData', {[this.propName]: this.inputValueModel})
    }
  }
}
</script>