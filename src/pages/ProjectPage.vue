<template>
  <div>
    <HeaderLayout/>

    <div class="project-page">
      <h1>Project Page</h1>
    </div>

    <FooterLayout/>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

import HeaderLayout from "@/components/base/HeaderLayout"
import FooterLayout from "@/components/base/FooterLayout"

export default {
  name: "ProjectPage",

  components: {
    HeaderLayout, FooterLayout
  },

  mounted() {
    console.log( useRoute().query.projectId )
  }
}
</script>