<template>
  <section class="wrapper-block"
           :style='`background-image: url("${ scheme.imgSrc }")`'>
    <div class="container">
      <div class="wrapper-block__wrapper">
        <div class="wrapper-block__title">
          <h2 :contenteditable="mode === 'Edit'"
              @blur="event => editing(event, 'title')">{{ scheme.title }}</h2>
        </div>
        <div class="wrapper-block__description">
          <p :contenteditable="mode === 'Edit'"
             @blur="event => editing(event, 'description')">{{ scheme.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "WrapperBlock",

  props: {
    mode: { type: String },
    scheme: { type: Object, required: true },
    positionIndex: { type: Number }
  },

  data() {
    return {
      dataForSave: {}
    }
  },

  inject: ['saveNewContent'],

  methods: {
    editing( event, objectKey ) {
      this.dataForSave = {
        ...this.dataForSave,
        [objectKey]: event.target.innerHTML
      }
      this.saveNewContent(this.dataForSave, this.positionIndex)
    },
  }
}
</script>