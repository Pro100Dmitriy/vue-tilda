<template>
  <PageProdConstructor :layout="pageInfo.layout"/>
  <FillButton class="preview-back"
              ariaLabel="Edit this page"
              @click.prevent="$router.push(`/page/${this.$route.params.pageId}`)">Edit this page</FillButton>
</template>

<script>
import {mapActions, mapState} from "vuex";

import PageProdConstructor from "@/components/page/PageProdConstructor"

export default {
  name: "PreviewPage",

  components: {
    PageProdConstructor
  },

  methods: {
    ...mapActions( {
      fetchPageInfo: 'editPage/fetchPageInfo',
    } ),
  },

  computed: {
    ...mapState( {
      pageInfo: state => state.editPage.pageInfo
    } )
  },

  async mounted() {
    await this.fetchPageInfo( this.$route.params.pageId )
  }
}
</script>