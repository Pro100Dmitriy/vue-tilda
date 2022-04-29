<template>
  <div>
    <HeaderSection/>

    <div class="project-page">
      <h1>Project Page</h1>
    </div>

    <FooterSection/>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

import HeaderSection from "@/components/base/HeaderSection"
import FooterSection from "@/components/base/FooterSection"

export default {
  name: "ProjectPage",

  components: {
    HeaderSection, FooterSection
  },

  mounted() {
    console.log( useRoute().params.projectId )
  }
}
</script>