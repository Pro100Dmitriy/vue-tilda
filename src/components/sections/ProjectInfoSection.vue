<template>
  <div class="project-info">
    <ContainerLayout>
      <div class="project-info__wrapper">
        <div class="info-top">
          <ButtonsList/>
          <div class="info-top__link-page">
            <svg v-sprite="{hash: 'pageUrl', width: '14px', height: '14px'}"></svg>
            <p>Page URL:</p>
            <router-link to="/">{{ pageURL }}</router-link>
          </div>
        </div>
        <div class="info-bottom">
          <div class="info-bottom__title">
            <h1>{{ getProjectInfo.title }}</h1>
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
import { mapGetters } from 'vuex'

import ContainerLayout from "@/layouts/ContainerLayout"
import ButtonsList from "@/components/ButtonsList"

import gearIcon from '@/assets/img/svg/gear.svg'
import plusIcon from '@/assets/img/svg/plus.svg'

export default {
  name: "ProjectInfoSection",

  props: {
    id: { type: Number, require: true }
  },

  data() {
    return {
      gearIcon: gearIcon,
      plusIcon: plusIcon,
      // Page info
      title: 'Something',
      pageURL: 'http://project5505388.tilda.ws',
      pagesList: []
    }
  },

  components: {
    ContainerLayout, ButtonsList
  },

  computed: mapGetters( ['getProjectInfo'] ),

  mounted() {
    console.log( this.getProjectInfo )
  }
}
</script>