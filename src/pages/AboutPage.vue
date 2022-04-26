<template>
  <h2>{{ title }}</h2>
  <router-link to="/">Main Page</router-link>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      title: 'About Page'
    }
  }
}
</script>