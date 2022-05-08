<template>
  <div class="construct-app">
    <div v-for="(block, index) of layout"
         :key="block.id">
      <EditableToolkit :positionIndex="index">
        <ParagraphBlock v-if="block.type === 'Paragraph'"
                        :scheme="block"/>
      </EditableToolkit>
    </div>
  </div>
</template>

<script>
import ParagraphBlock from "@/components/page/blockTypes/ParagraphBlock"
import EditableToolkit from "@/layouts/EditableToolkit"

export default {
  name: "PageConstructor",

  props: {
    layout: { type: Array, required: true }
  },

  components: {
    ParagraphBlock, EditableToolkit
  }
}
</script>