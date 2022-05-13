<template>
  <div class="pages-list__item">
    <div class="page-card">
      <div class="card-left">
        <router-link :to="'/page/' + pageId">
          <div class="card-left__image">
              <img class="card-left__img-tag" :src="imgSrc" alt="Page Image">
          </div>
        </router-link>
        <router-link :to="'/page/' + pageId">
          <div class="card-left__title">
              <h3>{{ title }}</h3>
          </div>
        </router-link>
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
        <div class="card-right__context">
          <ContextPopup :listSettings="listSettings"
                        :openPopup="openContext"
                        ref="settingPopup"/>
          <button class="dots-button project-setting__button"
                  aria-label="Open settings popup"
                  @click.stop.prevent="openContextPopup"
                  @blur="closeContextPopup">
            <svg class="dots-button__svg" v-sprite="{hash: 'dots_icon', width: '24px', height: '24px'}"></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

import ControlsList from "@/components/ControlsList/ControlsList"
import ContextPopup from "@/components/popups/ContextPopup";

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
        {id: 1, title: 'Settings', svgIcon: {hash: 'gearIcon', width: '14px', height: '14px' }, handler: () => this.openModals(this.pageId)},
        {id: 2, title: 'Publish', svgIcon: {hash: 'publishCloud', width: '14px', height: '14px' }},
        {id: 3, title: 'Delete', svgIcon: {hash: 'trashIcon', width: '14px', height: '14px' }, handler: () => this.deletePage( [this.projectInfo.id, this.pageId])},
      ],
      listSettings: [
        {title: 'Settings', link: '#', method: () => this.openModals(this.pageId)},
        {title: 'Publish', link: '#'},
        {title: 'Delete', link: '#', method: () => this.deletePage( [this.projectInfo.id, this.pageId])},
      ],
      openContext: false
    }
  },

  inject: ['openModals'],

  components: {
    ControlsList, ContextPopup
  },

  computed: {
    ...mapState({
      projectInfo: state => state.projectPage.projectInfo
    })
  },

  methods: {
    ...mapActions({
      deletePage: 'projectPage/deletePage'
    }),
    openContextPopup() {
      this.openContext = true
    },
    closeContextPopup() {
      this.openContext = false
    }
  }
}
</script>