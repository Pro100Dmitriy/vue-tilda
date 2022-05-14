<template>
  <EditHeader/>

  <PageSettings :show="showPageSettings"
                :pageInfo="activeInfo"/>
  <ImageDownloader :show="imageSelectModalsOpen"
                   @getSelectedImage="callbackImageSelector"/>
  <EditablePageSection/>
</template>

<script>
import {mapActions, mapState} from 'vuex'

import PageSettingsAdapter from '@/mixins/pages/PageSettingsAdapter'

import EditHeader from '@/components/base/EditHeader'
import PageSettings from "@/components/popups/PageSettings"
import ImageDownloader from "@/components/popups/ImageDownloader"
import EditablePageSection from '@/components/sections/EditablePageSection'

export default {
  name: "EditProjectPage",

  mixins: [PageSettingsAdapter],

  components: {
    EditHeader, PageSettings, ImageDownloader, EditablePageSection
  },

  methods: {
    ...mapActions( {
      fetchPage: 'editPage/fetchPage',
      fetchProjectInfo: 'projectPage/fetchProjectInfo',
      pageUpdateAndFetch: 'editPage/pageUpdateAndFetch'
    } ),
    initialization() {
      this.activeInfo = this.pageInfo
    },
    processSavingData( dataForSave ) {
      this.pageUpdateAndFetch( [this.activeInfo.projectId, this.activeInfo.id, dataForSave] )
    },
    async reacquisition() {
      await this.fetchProjectInfo( this.pageInfo.projectId )
    }
  },

  computed: {
    ...mapState( {
      pageInfo: state => state.editPage.pageInfo,
      projectInfo: state => state.projectPage.projectInfo
    } )
  },

  async mounted() {
    await this.fetchPage( this.$route.params.pageId )

    if( Number(this.pageInfo.id) !== Number(this.$route.params.pageId) )
      await this.fetchPage(this.$route.params.pageId)

    if( !this.projectInfo.id )
      await this.fetchProjectInfo( this.pageInfo.projectId )
  }
}
</script>