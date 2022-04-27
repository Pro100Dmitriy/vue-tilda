<template>
  <div>
    <HeaderLayout/>
    <ProjectLayouts/>
    <FooterLayout/>
  </div>
</template>

<script>
import HeaderLayout from "@/layouts/HeaderLayout";
import ProjectLayouts from "@/layouts/ProjectLayouts";
import FooterLayout from "@/layouts/FooterLayout";

export default {
  name: "MainPage",
  components: {
    HeaderLayout, ProjectLayouts, FooterLayout
  }
}
</script>