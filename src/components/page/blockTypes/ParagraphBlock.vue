<template>
  <section class="paragraph-block"
           :style='`background-image: url("${ scheme.imgSrc }")`'>
    <div class="container">
      <div class="paragraph-block__wrapper">
        <div class="paragraph-block__title">
          <h2>{{ scheme.title }}</h2>
        </div>
        <div class="paragraph-block__description">
          <p>{{ scheme.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ParagraphBlock",

  props: {
    scheme: { type: Object, required: true }
  }
}
</script>