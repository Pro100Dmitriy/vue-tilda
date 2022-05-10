<template>
  <div class="drag-setting"
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
      <div class="drag-setting__content">
        <div class="drag-setting__title">
          <h4>Paragraph block</h4>
        </div>
        <FormConstructor :formData="formData"
                         @changeData="changeData"/>
        <div class="drag-setting__submit">
          <FillButton class="drag-setting__submit-button"
                      ariaLabel="Close popup"
                      @click.prevent>Save</FillButton>
          <FillButton class="drag-setting__submit-button fill-button_stroke"
                      ariaLabel="Close popup"
                      @click.prevent="closeContentSettings">Close</FillButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormConstructor from "@/components/popups/FormConstructor"

export default {
  name: "DragSettings",

  props: {
    show: { type: Boolean, required: true }
  },

  data() {
    return {
      formData: {
        title: {type: 'input', propName: 'title', inputId: 'block-title', inputLabel: 'Title', inputValue: ''},
        description: {type: 'input', propName: 'description', inputId: 'block-description', inputLabel: 'Description', inputValue: ''}
      }
    }
  },

  inject: ['closeContentSettings'],

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
      console.log( value )
    }
  }
}
</script>