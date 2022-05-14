<template>
  <div class="tabs-nav">
    <ul class="tabs-nav__list">
      <li class="tabs-nav__item"
          v-for="tab of tabsNav"
          :key="tab">
        <span class="tabs-nav__link"
           :class="{ 'tabs-nav-active': tab === selected }"
           @click.prevent="setTab(tab)">{{ tab }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PopupTabNav",

  props: {
    tabsNav: { type: Array, required: true },
    selected: { type: String, required: true }
  },

  methods: {
    setTab(tab) {
      this.$emit('selected', tab)
    }
  }
}
</script>