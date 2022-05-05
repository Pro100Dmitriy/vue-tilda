<template>
  <form class="tab-form" method="POST">
    <div class="tab-form__entities"
         v-for="entity of formData"
         :key="entity.inputId">
      <InputTextGroup
          v-if="entity.type === 'input'"
          :inputId="entity.inputId"
          :inputLabel="entity.inputLabel"
          :inputValue="entity.inputValue"
          :propName="entity.propName"
          @changeData="changeData"/>
    </div>

  </form>
</template>

<script>
export default {
  name: "FormConstructor",

  props: {
    formData: { type: Array, required: true }
  },

  methods: {
    changeData( element ) {

      this.$emit('changeData', element)
    },
  }
}
</script>