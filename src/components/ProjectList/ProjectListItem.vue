<template>
  <div class="wrapper">

    <router-link :to="'/project/' + project.id">
      <div class="project-item">
        <div class="project-setting">
          <ContextPopup :listSettings="listSettings"
                        :projectId="project.id"
                        :openPopup="openPopup"
                        ref="settingPopup"/>
          <button class="dots-button project-setting__button"
                  aria-label="Open settings popup"
                  @click.stop.prevent="openSettingPopup"
                  @blur="closeSettingPopup">
            <svg class="dots-button__svg" v-sprite="{hash: 'dots_icon', width: '24px', height: '24px'}"></svg>
          </button>
        </div>
        <div class="project-item__top">
          <div class="project-item__title">
            <input type="text"
                   :value="project.title"
                   @click.stop.prevent
                   @input.stop.prevent
                   @blur="changeName"
                   @keypress.enter="changeName"
                   ref="inputTitle"
                   v-if="renameActive">
            <h3 v-else>{{ project.title }}</h3>
          </div>
        </div>
        <div class="project-item__bottom">
          <div class="edit-page">
            <svg class="edit-page__svg" width="14px" height="14px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.21 28">
              <g>
                <rect x="20.41" y="2.17" width="7.63" height="3.63" transform="translate(9.91 -15.97) rotate(45)"></rect>
                <rect x="11.41" y="3.89" width="7.63" height="18.18" transform="translate(13.64 -6.97) rotate(45)"></rect>
                <polygon points="0 28 4.45 18.36 9.85 23.76 0 28"></polygon>
              </g>
            </svg>
            <router-link class="edit-page__link" to="/">Edit page</router-link>
          </div>
          <div class="visit-page">
            <svg class="visit-page__svg" width="14px" height="14px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.14 26.14">
              <g>
                <polygon points="20.14 23.14 3 23.14 3 6 12.57 6 12.57 3 0 3 0 26.14 23.14 26.14 23.14 13.57 20.14 13.57 20.14 23.14"></polygon>
                <polygon points="16.14 0 16.14 3 21.02 3 7.24 16.78 9.36 18.9 23.14 5.12 23.14 10 26.14 10 26.14 0 16.14 0"></polygon>
              </g>
            </svg>
            <router-link class="visit-page__link" to="/">http://project5505388.tilda.ws</router-link>
          </div>
        </div>
      </div>
    </router-link>

  </div>
</template>

<script>
import {mapActions} from 'vuex'

import ContextPopup from "@/components/popups/ContextPopup"

export default {
  name: "ProjectListItem",

  props: {
    project: { type: Object, required: true }
  },

  data() {
    return {
      listSettings: [
        { title: 'Delete', link: '#', method: () => this.deleteProject(this.project.id) },
        { title: 'Rename', link: '#', method: this.renameProject }
      ],
      renameActive: false,
      openPopup: false,
    }
  },

  components: {
    ContextPopup
  },

  methods: {
    ...mapActions( {
      deleteProject: 'mainPage/deleteProject',
      updateProject: 'mainPage/updateProject'
    } ),
    openSettingPopup() {
      this.openPopup = !this.openPopup
    },
    closeSettingPopup() {
      this.openPopup = false
      this.renameActive = false
    },
    renameProject() {
      this.renameActive = !this.renameActive
    },
    changeName( event ) {
      this.renameActive = false
      this.updateProject([this.project.id, {title: event.target.value}])
    }
  }
}
</script>