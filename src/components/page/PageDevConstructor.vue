<template>
  <div class="construct-app">
    <div v-if="layout.length">
      <div v-for="(block, index) of layout"
           :key="block.id">
        <EditableToolkit :positionIndex="index" :blockData="block">
          <ParagraphBlock v-if="block.type === 'Paragraph' && block.show"
                          mode="Edit"
                          :positionIndex="index"
                          :scheme="block"/>
          <WrapperBlock v-if="block.type === 'Wrapper'  && block.show"
                        mode="Edit"
                        :positionIndex="index"
                        :scheme="block"/>
        </EditableToolkit>
      </div>
    </div>
    <div v-else
         class="empty-layout">
      <button class="empty-layout__btn"
              aria-label="Add new layout block"
              @click="openBuilder(0)">Add new block</button>
    </div>
  </div>
</template>

<script>
import ParagraphBlock from "@/components/page/blockTypes/ParagraphBlock"
import WrapperBlock from "@/components/page/blockTypes/WrapperBlock";
import EditableToolkit from "@/components/page/EditableToolkit"

export default {
  name: "PageDevConstructor",

  props: {
    layout: { type: Array, required: true }
  },

  inject: ['openBuilder'],

  components: {
    WrapperBlock, ParagraphBlock, EditableToolkit
  },
}
</script>