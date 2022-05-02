<template>
  <div class="pages-list__item">
    <div class="page-card">
      <div class="card-left">
        <div class="card-left__image">
          <img class="card-left__img-tag" :src="imgSrc" alt="Page Image">
        </div>
        <div class="card-left__title">
          <h3>{{ title }}</h3>
        </div>
      </div>
      <div class="card-right">
        <div class="card-right__info">
          <div class="card-right__info-name">
            <p>Main page</p>
          </div>
          <div class="card-right__info-status">
            <p>Page not published</p>
          </div>
        </div>
        <div class="card-right__controls">
          <ControlsList :buttonList="buttonList"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import useDeletePage from "@/hooks/useDeletePage"

import ControlsList from "@/components/ControlsList/ControlsList"

export default {
  name: "PageListItem",

  props: {
    pageId: { type: Number, required: true },
    imgSrc: { type: String },
    title: { type: String, required: true },
  },

  data() {
    return {
      buttonList: [
        {id: 1, title: 'Settings', svgIcon: {hash: 'gearIcon', width: '14px', height: '14px' }, handler: this.openSettings},
        {id: 2, title: 'Publish', svgIcon: {hash: 'publishCloud', width: '14px', height: '14px' }},
        {id: 3, title: 'Delete', svgIcon: {hash: 'trashIcon', width: '14px', height: '14px' }, handler: this.deletePageTest},
      ]
    }
  },

  components: {
    ControlsList
  },

  computed: mapState({
    projectInfo: state => state.projectPage.projectInfo
  }),

  methods: {
    ...mapActions({
      fetchProjectInfo: 'projectPage/fetchProjectInfo'
    }),
    ...mapMutations({
      openPageSettingsPopup: 'projectPage/openPageSettingsPopup'
    }),
    openSettings() {
      this.openPageSettingsPopup(this.pageId)
    },
    deletePageTest() {
      console.log( this.pageId )
      const { deletePage } = useDeletePage(this.projectInfo.id, this.fetchProjectInfo)
      deletePage(this.pageId)
    }
  }
}
</script>