<template>
  <form class="tab-form"
        method="POST"
        @submit.prevent="submitChecker">
    <div class="tab-form__entities"
         v-for="entity of getValue"
         :key="entity.inputId">
      <InputTextGroup
          v-if="entity.type === 'input'"
          :inputId="entity.inputId"
          :inputLabel="entity.inputLabel"
          :handler='entity.handler'
          @changeChecker="changeChecker"
          @focusChecker="focusChecker"
          @blurChecker="blurChecker"
          v-model="formChangedData[entity.propName]"/>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormConstructor",

  props: {
    formData: { type: Object, required: true }
  },

  data() {
    return {
      changed: false,
      focus: false,
      blur: false,
      submit: false,
      formChangedData: {
        ...this.getKeysObject()
      }
    }
  },

  methods: {
    getKeysObject() {
      let prepareFormDataLocal = {}
      Object.keys( this.formData ).forEach( key => {
        prepareFormDataLocal = {
          ...prepareFormDataLocal,
          ...{[key]: this.formData[key].inputValue}
        }
      } )
      return prepareFormDataLocal
    },
    changeChecker() {
      this.changed = true
    },
    focusChecker() {
      this.focus = true
    },
    blurChecker() {
      this.blur = true
    },
    submitChecker() {
      this.submit = true
    }
  },

  computed: {
    getValue() {
      return Object.values( this.formData )
    }
  },

  watch: {
    changed() {
      if( this.changed )
        this.$emit('changeData', this.formChangedData)
      this.changed = false
    },
    focus() {
      if( this.focus )
        this.$emit('focusInput', this.formChangedData)
      this.focus = false
    },
    blur() {
      if( this.blur )
        this.$emit('blurInput', this.formChangedData)
      this.blur = false
    },
    submit() {
      if( this.submit )
        this.$emit('submitForm', this.formChangedData)
      this.submit = false
    }
  }
}
</script>