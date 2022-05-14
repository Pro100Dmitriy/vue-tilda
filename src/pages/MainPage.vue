<template>
  <div>
    <HeaderOrigin/>
    <ProjectsSection/>
    <FooterOrigin/>
  </div>
</template>

<script>
import HeaderOrigin from "@/components/base/HeaderOrigin"
import FooterOrigin from "@/components/base/FooterOrigin"
import ProjectsSection from "@/components/sections/ProjectsSection"

export default {
  name: "MainPage",

  components: {
    HeaderOrigin, ProjectsSection, FooterOrigin
  },
}
</script>