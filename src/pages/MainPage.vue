<template>
  <div>
    <HeaderSection/>
    <ProjectsSection/>
    <FooterSection/>
  </div>
</template>

<script>
import HeaderSection from "@/components/base/HeaderSection"
import FooterSection from "@/components/base/FooterSection"
import ProjectsSection from "@/components/sections/ProjectsSection"

export default {
  name: "MainPage",

  components: {
    HeaderSection, ProjectsSection, FooterSection
  },
}
</script>