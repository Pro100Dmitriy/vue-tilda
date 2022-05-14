<template>
  <section class="paragraph-block">
    <div class="container">
      <div class="paragraph-block__wrapper">
        <div class="paragraph-block__title">
          <h2 :contenteditable="mode === 'Edit'"
              @blur="event => editing(event, 'title')">{{ scheme.title }}</h2>
        </div>
        <div class="paragraph-block__description">
          <p :contenteditable="mode === 'Edit'"
             @blur="event => editing(event, 'description')">{{ scheme.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ParagraphBlock",

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