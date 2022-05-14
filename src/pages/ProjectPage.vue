<template>
  <div>
    <HeaderOrigin/>
    <ProjectInfoSection/>
    <PageSettings :show="showPageSettings"
                  :pageInfo="activeInfo"/>
    <ImageDownloader :show="imageSelectModalsOpen"
                     @getSelectedImage="callbackImageSelector"/>
    <ProjectPagesSection/>
    <FooterOrigin/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import PageSettingsAdapter from '@/mixins/pages/PageSettingsAdapter'

import HeaderOrigin from "@/components/base/HeaderOrigin"
import FooterOrigin from "@/components/base/FooterOrigin"
import ProjectInfoSection from "@/components/sections/ProjectInfoSection"
import ProjectPagesSection from "@/components/sections/ProjectPagesSection"
import PageSettings from "@/components/popups/PageSettings"
import ImageDownloader from "@/components/popups/ImageDownloader"

export default {
  name: "ProjectPage",

  mixins: [PageSettingsAdapter],

  components: {
    HeaderOrigin, FooterOrigin, ProjectInfoSection, ProjectPagesSection, PageSettings, ImageDownloader
  },

  methods: {
    ...mapActions({
      fetchProjectInfo: 'projectPage/fetchProjectInfo',
      updatePage: 'projectPage/updatePage',
    } ),
    ...mapMutations( {
      getSelectedPageInfo: 'projectPage/getSelectedPageInfo'
    } ),
    initialization( pageId ) {
      this.getSelectedPageInfo(pageId)
      this.activeInfo = this.getPageActiveInfo
    },
    processSavingData( dataForSave ) {
      this.updatePage( [this.activeInfo.projectId, this.activeInfo.pageId, dataForSave] )
    },
    async reacquisition() {
      await this.fetchProjectInfo( this.activeInfo.projectId )
    },
  },

  computed: {
    ...mapGetters( {
      getPageActiveInfo: 'projectPage/getPageActiveInfo'
    } )
  },

  mounted() {
    this.fetchProjectInfo( this.$route.params.projectId )
  }
}
</script>