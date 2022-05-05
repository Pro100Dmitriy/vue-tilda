<template>
  <div class="project-info">
    <ContainerLayout>
      <div class="project-info__wrapper">
        <div class="info-top">
          <ControlsList :buttonList="buttonList"/>
          <div class="info-top__link-page">
            <svg v-sprite="{hash: 'pageUrl', width: '14px', height: '14px'}"></svg>
            <p>Page URL:</p>
            <router-link to="/">{{ projectInfo.siteURL }}</router-link>
          </div>
        </div>
        <div class="info-bottom">
          <div class="info-bottom__title">
            <h1>{{ projectInfo.title }}</h1>
          </div>
          <div class="info-bottom__controls">
            <FillButton class="control-settings"
                        title="Settings"
                        :svgSetting="{hash: 'gearIcon', width: '14px', height: '14px'}"
                        ariaLabel="Show page Settings">
              Settings
            </FillButton>
            <FillButton class="control-add-page"
                        :iconSrc="plusIcon"
                        @click.prevent="addPage"
                        ariaLabel="Add new page">
              Add new page
            </FillButton>
          </div>
        </div>
      </div>
    </ContainerLayout>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import ContainerLayout from "@/layouts/ContainerLayout"
import ControlsList from "@/components/ControlsList/ControlsList"

import plusIcon from '@/assets/img/svg/plus.svg'

export default {
  name: "ProjectInfoSection",

  props: {
    id: { type: Number, require: true }
  },

  data() {
    return {
      plusIcon: plusIcon,
      buttonList: [
        {id: 1, title: 'Domen connect', svgIcon: {hash: 'earthIcon', width: '14px', height: '14px' }, handler: this.openProjectDomenPopup},
        {id: 2, title: 'Publishing all pages', svgIcon: {hash: 'publishPageIcon', width: '17px', height: '14px' }},
        {id: 3, title: 'Requests', svgIcon: {hash: 'requestsList', width: '20px', height: '14px' }},
      ]
    }
  },

  components: {
    ContainerLayout, ControlsList
  },

  computed: mapState( {
    projectInfo: state => state.projectPage.projectInfo
  } ),

  methods: {
    ...mapActions( {
      createPage: 'projectPage/createPage'
    } ),
    ...mapMutations( {
      openProjectDomenPopup: 'projectPage/openProjectDomenPopup'
    } ),
    addPage() {
      this.createPage(this.projectInfo.id)
    }
  },

  mounted() {
    console.log( this.projectInfo )
  }
}
</script>