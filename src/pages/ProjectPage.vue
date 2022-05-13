<template>
  <div>
    <HeaderOrigin/>

    <ProjectInfoSection/>
    <ProjectPagesSection/>

    <FooterOrigin/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import HeaderOrigin from "@/components/base/HeaderOrigin"
import FooterOrigin from "@/components/base/FooterOrigin"
import ProjectInfoSection from "@/components/sections/ProjectInfoSection"
import ProjectPagesSection from "@/components/sections/ProjectPagesSection"

export default {
  name: "ProjectPage",

  components: {
    HeaderOrigin, FooterOrigin, ProjectInfoSection, ProjectPagesSection
  },

  methods: mapActions({
    fetchProjectInfo: 'projectPage/fetchProjectInfo'
  } ),

  mounted() {
    this.fetchProjectInfo( this.$route.params.projectId )
  }
}
</script>