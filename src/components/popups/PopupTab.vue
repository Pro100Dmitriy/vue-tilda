<template>
    <div class="tabs-content__item"
         :class="{ 'tab-content-active': isSelected }">
      <slot/>
      <div class="tab-submit">
        <div class="tab-submit__left">
          <a class="tab-submit__link" href="#">Move to the page properties</a>
        </div>
        <div class="tab-submit__right">
          <FillButton class="tab-submit__button fill-button_stroke" ariaLabel="Close popup">Close</FillButton>
          <FillButton class="tab-submit__button" ariaLabel="Close popup">Save changes</FillButton>
        </div>
      </div>
    </div>
</template>

<script>
import FillButton from "@/components/UI/FillButton"

export default {
  name: "PopupTab",

  props: {
    isSelected: { type: Boolean }
  },

  components: {
    FillButton
  }
}
</script>