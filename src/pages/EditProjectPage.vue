<template>
  <EditHeader/>
  <EditableSettingSection :show="showPageSettings"/>
  <EditablePageSection/>
</template>

<script>
import {mapActions, mapState} from 'vuex'

import EditHeader from '@/components/base/EditHeader'
import EditableSettingSection from "@/components/sections/EditableSettingSection"
import EditablePageSection from '@/components/sections/EditablePageSection'

export default {
  name: "EditProjectPage",

  data() {
    return {
      showPageSettings: false
    }
  },

  provide() {
    return {
      openPageSettings: this.openPageSettings
    }
  },

  components: {
    EditHeader, EditableSettingSection, EditablePageSection
  },

  methods: {
    ...mapActions( {
      fetchPageInfo: 'editPage/fetchPageInfo',
      fetchProjectInfo: 'projectPage/fetchProjectInfo'
    } ),
    openPageSettings() {
      this.showPageSettings = true
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
    if( !this.projectInfo.id )
      await this.fetchProjectInfo( this.pageInfo.projectId )
  }
}
</script>