<template>
  <section class="paragraph-block">
    <div class="container">
      <div class="paragraph-block__wrapper">
        <div class="paragraph-block__title">
          <h2>{{ scheme.title }}</h2>
        </div>
        <div class="paragraph-block__description"
             @click="startEdit">
          <p ref="parag">{{ scheme.description }}</p>
          <div class="edit-text">
            <textarea v-model="description"
                      ref="paragEditor"
                      @blur="showTextarea = false"></textarea>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ParagraphBlock",

  props: {
    scheme: { type: Object, required: true }
  },

  data() {
    return {
      showTextarea: false,
      description: this.scheme.description
    }
  },

  methods: {
    startEdit() {
      this.showTextarea = true
      const range = new Range()
      console.log( range )
      this.$refs.paragEditor.focus()
      console.log( this.$refs.paragEditor.selectionStart )
    }
  }
}
</script>