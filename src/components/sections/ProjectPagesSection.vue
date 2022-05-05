<template>
  <div class="project-pages">
    <DomenPopup/>
    <SettingsPopup/>
    <ContainerLayout>
      <div class="project-pages__wrapper">
        <div class="project-pages__small">
          <p>Pages:</p>
        </div>
        <div class="project-pages__pages">
          <PageList/>
        </div>
      </div>
    </ContainerLayout>
  </div>
</template>

<script>
import ContainerLayout from "@/layouts/ContainerLayout"
import PageList from "@/components/PageList/PageList"
import SettingsPopup from "@/components/popups/SettingsPopup"
import DomenPopup from "@/components/popups/DomenPopup"

export default {
  name: "ProjectPagesSection",

  components: {
    ContainerLayout, PageList, SettingsPopup, DomenPopup
  }
}
</script>