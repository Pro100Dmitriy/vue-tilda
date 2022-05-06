<template>
  <form class="tab-form" method="POST">
    <div class="tab-form__entities"
         v-for="entity of getValue"
         :key="entity.inputId">
      <InputTextGroup
          v-if="entity.type === 'input'"
          :inputId="entity.inputId"
          :inputLabel="entity.inputLabel"
          :handler='entity.handler'
          @changeChecker="changeChecker"
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
    }
  }
}
</script>