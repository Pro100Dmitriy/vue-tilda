<template>
  <section class="wrapper-block"
           :style='`background-image: url("${ scheme.imgSrc }")`'>
    <div class="container">
      <div class="wrapper-block__wrapper">
        <div class="wrapper-block__title">
          <h2>{{ scheme.title }}</h2>
        </div>
        <div class="wrapper-block__description">
          <p>{{ scheme.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "WrapperBlock",

  props: {
    scheme: { type: Object, required: true }
  }
}
</script>