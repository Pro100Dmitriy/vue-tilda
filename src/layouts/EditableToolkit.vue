<template>
  <div class="editable-toolkit"
       :class="{'editable-toolkit_active': showToolkit}"
       @mousemove="showToolkit = true"
       @mouseleave="showToolkit = false">
    <div class="editable-toolkit__top">
      <div class="editable-toolkit__top-left">
        <div class="btn-group">
          <button class="btn-group__item" aria-label="Set up block">
            <img :src="gearIcon" alt="Set up block" aria-hidden="true">
            <span>Settings</span>
          </button>
          <button class="btn-group__item"
                  @click="openContentSettings( positionIndex )"
                  aria-label="Change content">
            <img :src="editIcon" alt="Change content" aria-hidden="true">
            <span>Content</span>
          </button>
        </div>
      </div>
      <div class="editable-toolkit__top-right">
        <div class="btn-group">
          <button class="btn-group__item"
                  @click="copyLayout( positionIndex )"
                  aria-label="Copy Block">
            <img :src="copyIcon" alt="Copy Block" aria-hidden="true">
          </button>
          <button class="btn-group__item"
                  @click="deleteLayout( positionIndex )"
                  aria-label="Delete Block">
            <img :src="trashIcon" alt="Delete Block" aria-hidden="true">
          </button>
          <button class="btn-group__item"
                  @click="visibilityLayout( positionIndex )"
                  aria-label="Show/hidden Block">
            <img :src="eyeIcon" alt="Show/hidden Block" aria-hidden="true">
          </button>
        </div>
        <div class="btn-group">
          <button class="btn-group__item"
                  @click="changePositionLayout('up', positionIndex)"
                  aria-label="Move to up">
            <img :src="arrowUpIcon" alt="Move to up" aria-hidden="true">
          </button>
          <button class="btn-group__item"
                  @click="changePositionLayout('down', positionIndex)"
                  aria-label="Move to down">
            <img :src="arrowDownIcon" alt="Move to down" aria-hidden="true">
          </button>
        </div>
      </div>
    </div>
    <slot/>
    <div v-if="!blockData.show"
         class="editable-toolkit__visibility">
      <div class="visibility-message">
        <p><b>{{ blockData.title }}.</b></p>
        <img :src="eyeIcon" alt="Eye icon" aria-hidden="true">
        <p>Block hidden!</p>
      </div>
    </div>
    <div class="editable-toolkit__bottom">
      <button class="add-item"
              @click="openBuilder(positionIndex)"
              aria-label="Add new Item">
        <img :src="plusIcon" alt="Add new Item" aria-hidden="true">
      </button>
    </div>
  </div>

  <ParagraphSettings v-if="blockData.type === 'Paragraph' && blockData.show"
                     :scheme="blockData"
                     :show="showContentSettings"
                     :currentPosition="positionIndex"/>
  <WrapperSettings v-if="blockData.type === 'Wrapper' && blockData.show"
                   :scheme="blockData"
                   :show="showContentSettings"
                   :currentPosition="positionIndex"/>

</template>

<script>
import plusIcon from '@/assets/img/svg/plus.svg'
import trashIcon from '@/assets/img/svg/trash.svg'
import gearIcon from '@/assets/img/svg/gear.svg'
import editIcon from '@/assets/img/svg/edit.svg'
import arrowUpIcon from '@/assets/img/arrow-up-icon.png'
import arrowDownIcon from '@/assets/img/arrow-down-icon.png'
import eyeIcon from '@/assets/img/eye-icon.png'
import copyIcon from '@/assets/img/copy-icon.png'

import ParagraphSettings from '@/components/page/blockTypes/ParagraphSettings'
import WrapperSettings from "@/components/page/blockTypes/WrapperSettings"

export default {
  name: "EditableToolkit",

  props: {
    positionIndex: { type: Number, required: true },
    blockData: { type: Object, required: true }
  },

  data() {
    return {
      plusIcon,
      trashIcon,
      gearIcon,
      editIcon,
      arrowUpIcon,
      arrowDownIcon,
      eyeIcon,
      copyIcon,
      showToolkit: false,
      showContentSettings: false
    }
  },

  provide() {
    return {
      closeContentSettings: this.closeContentSettings
    }
  },

  inject: ['openBuilder', 'deleteLayout', 'changePositionLayout', 'copyLayout', 'visibilityLayout'],

  components: {
    ParagraphSettings, WrapperSettings
  },

  methods: {
    openContentSettings() {
      this.showContentSettings = true
    },
    closeContentSettings( transition ) {
      if( transition )
        transition()
      setTimeout( () => {
        this.showContentSettings = false
      }, 300 )
    },
  }
}
</script>