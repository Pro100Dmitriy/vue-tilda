<template>
  <div>
    <HeaderSection/>

    <ProjectInfoSection/>
    <ProjectPagesSection/>

    <FooterSection/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import HeaderSection from "@/components/base/HeaderSection"
import FooterSection from "@/components/base/FooterSection"
import ProjectInfoSection from "@/components/sections/ProjectInfoSection"
import ProjectPagesSection from "@/components/sections/ProjectPagesSection"

export default {
  name: "ProjectPage",

  components: {
    HeaderSection, FooterSection, ProjectInfoSection, ProjectPagesSection
  },

  methods: mapActions({
    fetchProjectInfo: 'projectPage/fetchProjectInfo'
  } ),

  mounted() {
    this.fetchProjectInfo( this.$route.params.projectId )
  }
}
</script>