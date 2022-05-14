<template>
  <section class="paragraph-block">
    <div class="container">
      <div class="paragraph-block__wrapper">
        <div class="paragraph-block__title">
          <h2>{{ scheme.title }}</h2>
        </div>
        <div class="paragraph-block__description">
          <p @click="startWriting"
             ref="paragraph">{{ editingParagraph }}</p>
          <div class="edit-text">
            <textarea v-model="description"
                      ref="paragraphEditor"
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
      description: this.scheme.description,
      anchorPosition: 0,
      newString: ''
    }
  },

  methods: {
    startWriting() {
      // const range = new Range()
      const paragraphEditor = this.$refs.paragraphEditor
      const selection = document.getSelection()

      // range.setStart( this.$refs.paragraph, 0 )
      // range.setEnd( this.$refs.paragraph, 1 )
      //
      // document.getSelection().addRange(range)

      console.log( document.getSelection() )
      // this.writeText()
      paragraphEditor.focus()
      this.anchorPosition = selection.anchorOffset
      paragraphEditor.selectionStart = paragraphEditor.selectionEnd = selection.anchorOffset
    },
    writeText( event ) {
      document.addEventListener('keypress', event => {
        console.log( event )
        this.newString += event.key
      })
      console.log( event )
    }
  },

  computed: {
    editingParagraph() {
      // this.description.ind
      let description = this.description

      const left = description.slice(0, this.anchorPosition)
      const right = description.slice(this.anchorPosition)

      description = left + '|' + right
      return description
    }
  }
}
</script>