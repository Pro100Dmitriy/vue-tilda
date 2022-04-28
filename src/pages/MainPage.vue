<template>
  <div>
    <HeaderLayout/>
    <ProjectLayouts/>
    <FooterLayout/>
  </div>
</template>

<script>
import HeaderLayout from "@/components/base/HeaderLayout"
import FooterLayout from "@/components/base/FooterLayout"
import ProjectLayouts from "@/components/ProjectLayouts"

export default {
  name: "MainPage",
  components: {
    HeaderLayout, ProjectLayouts, FooterLayout
  }
}
</script>