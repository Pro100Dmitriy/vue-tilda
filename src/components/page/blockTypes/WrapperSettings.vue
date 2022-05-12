<template>
  <div v-if="show"
       class="drag-setting"
       ref="dragSetting">
    <div class="drag-setting__wrapper">
      <div class="drag-setting__controls"
           @mousedown="moveDrag"
           @dragstart="moveDrag"
           @mouseup="stopDrag"
           @dragleave="stopDrag"
           @dragend="stopDrag">
        <span class="gragstart"></span>
      </div>
      <div class="drag-content drag-setting__content">
        <div class="drag-content__hid-scroll">
          <div class="drag-content__inner">
            <div class="drag-content__title">
              <h4>Wrapper block</h4>
            </div>
            <FormConstructor :formData="formData"
                             @changeData="changeData"/>
            <div class="drag-content__image"
                 @click="openImageSelector( setImage )">
              <div class="drag-content__image-overlay">
                <svg v-sprite="{hash: 'publishPageIcon', width: '23px', height: '20px' }"></svg>
              </div>
              <div class="drag-content__image-wrapper">
                <img :src="currentImg" :alt="`Block ${scheme.type} image`">
              </div>
            </div>
            <div class="drag-content__submit">
              <FillButton class="drag-submit-btn"
                          ariaLabel="Close popup"
                          @click.prevent="saveNewContent(dataForSave, currentPosition)">Save</FillButton>
              <FillButton class="drag-submit-btn fill-button_stroke"
                          ariaLabel="Close popup"
                          @click.prevent="closeContentSettings(closeTransition)">Close</FillButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dragSetting from "@/mixins/page/blockMixins/dragSetting"
import FormConstructor from "@/components/popups/FormConstructor"

export default {
  name: "WrapperSettings",

  data() {
    return {
      formData: {
        title: {type: 'input', propName: 'title', inputId: 'block-title', inputLabel: 'Title', inputValue: ''},
        description: {type: 'input', propName: 'description', inputId: 'block-description', inputLabel: 'Description', inputValue: ''}
      },
      currentImg: this.scheme.imgSrc,
      selectedImg: '',
      dataForSave: {}
    }
  },

  inject: ['closeContentSettings', 'saveNewContent', 'openImageSelector'],

  mixins: [dragSetting],

  components: {
    FormConstructor
  },

  methods: {
    setDefaultValues() {
      this.formData.title.inputValue = this.scheme.title
      this.formData.description.inputValue = this.scheme.description
      this.currentImg = this.scheme.imgSrc
    },
    changeData( value ) {
      this.dataForSave = {
        ...value,
        imgSrc: this.currentImg
      }
    },
    setImage( value ) {
      if( value ) {
        this.currentImg = value
      }
      this.dataForSave = {
        ...this.dataForSave,
        imgSrc: this.currentImg
      }
    }
  },

  watch: {
    show( newValue ) {
      if( newValue )
        this.setDefaultValues()
    }
  }
}
</script>