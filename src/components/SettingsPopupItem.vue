<template>
  <li class="setting-popup__item">
    <a class="setting-popup__link"
       :href="link ?? '#'"
       @click.stop.prevent="method">
      {{ title }}
    </a>
  </li>
</template>

<script>
export default {
  name: "SettingsPopupItem",

  props: {
    title: { type: String, required: true },
    link: { type: String },
    method: { type: Function }
  }
}
</script>