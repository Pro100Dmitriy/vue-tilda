<template>
  <div class="construct-app">
    <div v-if="layout.length">
      <div v-for="(block, index) of layout"
           :key="block.id">
        <EditableToolkit :positionIndex="index" :visibility="block.show" :blockName="block.title">
          <ParagraphBlock v-if="block.type === 'Paragraph' && block.show"
                          :scheme="block"/>
          <WrapperBlock v-if="block.type === 'Wrapper'  && block.show"
                        :scheme="block"/>
        </EditableToolkit>
      </div>
    </div>
    <div v-else>
      <button class="add-layout"
              @click="openBuilder(0)">Add new block</button>
    </div>
  </div>
</template>

<script>
import ParagraphBlock from "@/components/page/blockTypes/ParagraphBlock"
import WrapperBlock from "@/components/page/blockTypes/WrapperBlock";
import EditableToolkit from "@/layouts/EditableToolkit"

export default {
  name: "PageConstructor",

  props: {
    layout: { type: Array, required: true }
  },

  inject: ['openBuilder'],

  components: {
    WrapperBlock,
    ParagraphBlock, EditableToolkit
  }
}
</script>