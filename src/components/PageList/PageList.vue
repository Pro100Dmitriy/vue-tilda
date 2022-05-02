<template>
  <div class="pages-list">
    <PageListItem v-for="page of pagesList"
                  :key="page.pageId"
                  :pageId="page.pageId"
                  :imgSrc="page.prevImage"
                  :title="page.title"/>
  </div>
</template>

<script>
import PageListItem from "@/components/PageList/PageListItem"

export default {
  name: "PageList",

  props: {
    pagesList: { type: Array, require: true }
  },

  components: {
    PageListItem
  }
}
</script>