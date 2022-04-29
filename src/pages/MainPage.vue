<template>
  <div>
    <HeaderSection/>
    <ProjectSection/>
    <FooterSection/>
  </div>
</template>

<script>
import HeaderSection from "@/components/base/HeaderSection"
import FooterSection from "@/components/base/FooterSection"
import ProjectSection from "@/components/ProjectSection"

export default {
  name: "MainPage",
  components: {
    HeaderSection, ProjectSection, FooterSection
  }
}
</script>