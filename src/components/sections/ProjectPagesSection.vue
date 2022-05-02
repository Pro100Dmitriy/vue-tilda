<template>
  <div class="project-pages">
    <SettingsPopup/>
    <ContainerLayout>
      <div class="project-pages__wrapper">
        <div class="project-pages__small">
          <p>Pages:</p>
        </div>
        <div class="project-pages__pages">
          <PageList :pagesList="getPages"/>
        </div>
      </div>
    </ContainerLayout>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import ContainerLayout from "@/layouts/ContainerLayout"
import PageList from "@/components/PageList/PageList"
import SettingsPopup from "@/components/popups/SettingsPopup"

export default {
  name: "ProjectPagesSection",

  components: {
    ContainerLayout, PageList, SettingsPopup
  },

  computed: mapGetters( {
    getPages: 'projectPage/getPages'
  } ),

  mounted() {
    console.log( this.getPages )
  }
}
</script>