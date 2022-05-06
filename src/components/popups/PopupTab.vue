<template>
    <div class="tabs-content__item"
         :class="{ 'tab-content-active': isSelected }">
      <div class="tabs-content__item-wrapper"
           ref="itemWrapper">
        <slot/>
      </div>
    </div>
</template>

<script>
export default {
  name: "PopupTab",

  props: {
    isSelected: { type: Boolean }
  }
}
</script>