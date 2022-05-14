<template>
  <div class="modal"
       :class="{'modal_open': show}">
    <div class="modal__wrapper">

      <div class="modal__bg" @click="closeFunction"></div>
      <div class="modal-content">
        <div class="modal-content__top">
          <div class="modal-content__title">{{ titleModal }}</div>
          <button class="cross-button modal-content__cross"
                  :aria-label="'Close' + titleModal"
                  @click.prevent="closeFunction">
            {{ 'Open' + titleModal }}
          </button>
        </div>

        <div class="modal-content__bottom">
          <slot/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ModalsWrapper",

  props: {
    show: { type: Boolean, required: true },
    titleModal: { type: String, required: true },
    closeFunction: { type: Function, required: true }
  }
}
</script>