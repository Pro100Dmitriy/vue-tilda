<template>
  <EditHeader/>
  <EditablePageSection/>
</template>

<script>
import {mapActions, mapState} from 'vuex'

import EditHeader from '@/components/base/EditHeader'
import EditablePageSection from '@/components/sections/EditablePageSection'

export default {
  name: "EditProjectPage",

  components: {
    EditHeader, EditablePageSection
  },

  methods: {
    ...mapActions( {
      fetchPageInfo: 'editPage/fetchPageInfo',
      fetchProjectInfo: 'projectPage/fetchProjectInfo'
    } )
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