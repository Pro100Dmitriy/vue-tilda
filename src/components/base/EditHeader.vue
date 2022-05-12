<template>
  <header class="edit-header">
    <div class="edit-header__wrapper">
      <div class="edit-header__left">
        <div class="breadcrumbs">
          <ul class="breadcrumbs__list">
            <li class="breadcrumbs__item">
              <router-link to="/">
                <img class="link-img" :src="houseIcon" alt="House" aria-hidden="true">
                {{ projectInfo.title }}
              </router-link>
            </li>
            <li class="breadcrumbs__item">
              <router-link :to="'/project/' + pageInfo.projectId">{{ pageInfo.title }}</router-link>
            </li>
          </ul>
          <div class="bread-popup">
            <button class="bread-popup__open-button"
                    @blur="showPageList = false"
                    @click="showPageList = !showPageList">
              <img :src="downIcon" alt="Button arrow icon" aria-hidden="true">
            </button>
            <div class="bread-popup__content"
                 :class="{'bread-popup__content_open': showPageList}"
                 @mouseleave="showPageList = false">
              <button class="bread-popup__add-button">
                Create a new page
              </button>
              <ul class="bread-popup__list">
                <li v-for="page of getPages"
                    :key="page.pageId"
                    class="bread-popup__item">
                  <button @click="$router.push(`/page/${page.pageId}`)">{{ page.title }}</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="page-status"
             :class="{'saved-status': layoutIsSaved}">
          <div class="page-status__saved">
            <img :src="cloudUploadIcon" alt="All changes saved!">
            <p>Saved!</p>
          </div>
          <div class="page-status__saving">
            <span class="spinner"></span>
            <p>Saving...</p>
          </div>
        </div>
      </div>
      <div class="edit-header__right">
        <div class="edit-routes">
          <ul class="edit-routes__list">
            <li class="edit-routes__item">
              <a href="javascript:void(0)">Chanel</a>
            </li>
            <li class="edit-routes__item">
              <router-link :to="`/preview/${pageInfo.id}`">Preview</router-link>
            </li>
            <li class="edit-routes__item">
              <a href="javascript:void(0)">Publish</a>
            </li>
            <li class="edit-routes__item">
              <a href="javascript:void(0)">Settings</a>
            </li>
            <li class="edit-routes__item">
              <a href="javascript:void(0)">Support</a>
            </li>
            <li class="edit-routes__item">
              <a href="javascript:void(0)"
                 @blur="showMoreList = false"
                 @click="showMoreList = !showMoreList">
                More
                <img class="link-img" :src="downIcon" alt="Button arrow icon" aria-hidden="true">
              </a>
              <ul class="child-list"
                  :class="{'child-list_open': showMoreList}"
                  @mouseleave="showMoreList = false">
                <li class="child-list__item">
                  <a href="javascript:void(0)"
                     @click.prevent="openPageSettings">Settings</a>
                </li>
                <li class="child-list__item">
                  <router-link to="/">My projects</router-link>
                </li>
                <li class="child-list__item">
                  <router-link to="/profile">Profile</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState, mapGetters} from "vuex"
import downIcon from '@/assets/img/svg/down.svg'
import houseIcon from '@/assets/img/house-icon.png'
import cloudUploadIcon from '@/assets/img/cloud-upload.png'

export default {
  name: "EditHeader",

  data() {
    return {
      downIcon,
      houseIcon,
      cloudUploadIcon,
      projectName: 'testProject',

      showPageList: false,
      showMoreList: false
    }
  },

  inject: ['openPageSettings'],

  computed: {
    ...mapState( {
      pageInfo: state => state.editPage.pageInfo,
      projectInfo: state => state.projectPage.projectInfo,
      layoutIsSaved: state => state.editPage.layoutIsSaved
    } ),
    ...mapGetters( {
      getPages: 'projectPage/getPages'
    } )
  }
}
</script>