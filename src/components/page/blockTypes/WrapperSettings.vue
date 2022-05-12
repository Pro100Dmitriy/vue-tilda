<template>
  <div v-if="show"
       class="drag-setting"
       :class="{'drag-setting_open': show}"
       ref="dragSetting">
    <div class="drag-setting__wrapper">
      <div class="drag-setting__controls"
           @mousedown="moveFlySetting"
           @dragstart="moveFlySetting"
           @mouseup="stopFlySetting"
           @dragleave="stopFlySetting"
           @dragend="stopFlySetting">
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
                <img :src="selectedImg ? selectedImg : currentImg" :alt="`Block ${scheme.type} image`">
              </div>
            </div>
            <div class="drag-content__submit">
              <FillButton class="drag-submit-btn"
                          ariaLabel="Close popup"
                          @click.prevent="saveNewContent(dataForSave, currentPosition)">Save</FillButton>
              <FillButton class="drag-submit-btn fill-button_stroke"
                          ariaLabel="Close popup"
                          @click.prevent="closeContentSettings">Close</FillButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormConstructor from "@/components/popups/FormConstructor";

export default {
  name: "WrapperSettings",

  props: {
    show: { type: Boolean, required: true },
    scheme: { type: Object, required: true },
    currentPosition: { type: Number, required: true }
  },

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

  components: {
    FormConstructor
  },

  methods: {
    mouseMove( {clientX, clientY} ) {
      let x = clientX - 120
      let y = clientY - 10

      this.$refs.dragSetting.style.transform = `translate(${x}px,${y}px)`
    },
    moveFlySetting() {
      // const {left, top} = this.$refs.dragSetting.getBoundingClientRect()
      document.addEventListener('mousemove', this.mouseMove )
    },
    stopFlySetting() {
      document.removeEventListener( 'mousemove', this.mouseMove )
    },
    changeData( value ) {
      this.dataForSave = value
    },
    setDefaultValues() {
      this.formData.title.inputValue = this.scheme.title
      this.formData.description.inputValue = this.scheme.description
    },
    setImage( value ) {
      this.selectedImg = value ? value : this.currentImg
      this.dataForSave = {
        ...this.dataForSave,
        imgSrc: this.selectedImg
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

<style scoped>

</style>