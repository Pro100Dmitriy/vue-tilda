<template>
  <EditHeader/>
  <EditableSettingSection :show="showPageSettings"/>
  <ImageDownloader :show="imageSelectModalsOpen"
                   @getSelectedImage="callbackImageSelector"/>
  <EditablePageSection/>
</template>

<script>
import {mapActions, mapState} from 'vuex'

import EditHeader from '@/components/base/EditHeader'
import EditableSettingSection from "@/components/sections/EditableSettingSection"
import ImageDownloader from "@/components/popups/ImageDownloader"
import EditablePageSection from '@/components/sections/EditablePageSection'

export default {
  name: "EditProjectPage",

  data() {
    return {
      showPageSettings: false,
      imageSelectModalsOpen: false,
      callbackImageSelector: null
    }
  },

  provide() {
    return {
      openPageSettings: this.openPageSettings,
      closePageSettings: this.closePageSettings,
      closeAndSavePageSettings: this.closeAndSavePageSettings,
      openImageSelector: this.openImageSelector,
      closeImageSelector: this.closeImageSelector
    }
  },

  components: {
    EditHeader, EditableSettingSection, ImageDownloader, EditablePageSection
  },

  methods: {
    ...mapActions( {
      fetchPageInfo: 'editPage/fetchPageInfo',
      fetchProjectInfo: 'projectPage/fetchProjectInfo'
    } ),
    openPageSettings() {
      this.showPageSettings = true
    },
    closePageSettings() {
      this.showPageSettings = false
    },
    async closeAndSavePageSettings() {
      this.showPageSettings = false
      await this.fetchProjectInfo( this.pageInfo.projectId )
    },
    openImageSelector( callback ) {
      this.callbackImageSelector = callback
      this.imageSelectModalsOpen = true
    },
    closeImageSelector() {
      document.body.style.overflow = 'auto'
      this.callbackImageSelector = null
      this.imageSelectModalsOpen = false
    }
  },

  computed: {
    ...mapState( {
      pageInfo: state => state.editPage.pageInfo,
      projectInfo: state => state.projectPage.projectInfo
    } )
  },

  async mounted() {
    await this.fetchPageInfo( this.$route.params.pageId )
    if( this.projectInfo.id )
      await this.fetchProjectInfo( this.pageInfo.projectId )
  }
}
</script>