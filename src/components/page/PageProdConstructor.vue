<template>
  <div v-for="block of layout"
       :key="block.id">
    <ParagraphBlock v-if="block.type === 'Paragraph' && block.show"
                    :scheme="block"/>
    <WrapperBlock v-if="block.type === 'Wrapper'  && block.show"
                  :scheme="block"/>
  </div>
</template>

<script>
import WrapperBlock from "@/components/page/blockTypes/WrapperBlock"
import ParagraphBlock from "@/components/page/blockTypes/ParagraphBlock"

export default {
  name: "PageProdConstructor",

  props: {
    layout: { type: Array, required: true }
  },

  components: {
    WrapperBlock, ParagraphBlock
  },
}
</script>