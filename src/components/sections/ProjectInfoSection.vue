<template>
  <div class="project-info">
    <ModalsWrapper :show="showModals"
                   titleModal="Change domain name?"
                   :closeFunction="closeModals">
      <div v-if="!modalLoad"
           class="project-info__modals">
        <FormConstructor :formData="formData"
                         @changeData="changeData"/>
        <div class="tab-submit">
          <div class="tab-submit__left">
            <a class="tab-submit__link" href="#">Move to the page properties</a>
          </div>
          <div class="tab-submit__right">
            <FillButton class="tab-submit__button fill-button_stroke"
                        ariaLabel="Close popup"
                        @click.prevent="closeModals">Close</FillButton>
            <FillButton class="tab-submit__button"
                        ariaLabel="Close popup"
                        @click.prevent="saveAndCloseModals">Save changes</FillButton>
          </div>
        </div>
      </div>
    </ModalsWrapper>
    <ContainerWrapper>
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
    </ContainerWrapper>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import ControlsList from "@/components/ControlsList/ControlsList"
import FormConstructor from "@/components/popups/FormConstructor"
import ModalsWrapper from "@/layouts/ModalsWrapper"

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
        {id: 1, title: 'Domen connect', svgIcon: {hash: 'earthIcon', width: '14px', height: '14px' }, handler: this.openModals},
        {id: 2, title: 'Publishing all pages', svgIcon: {hash: 'publishPageIcon', width: '17px', height: '14px' }},
        {id: 3, title: 'Requests', svgIcon: {hash: 'requestsList', width: '20px', height: '14px' }},
      ],
      formData: {
        siteURL: {type: 'input', propName: 'siteURL', inputId: 'page-domain', inputLabel: 'Domain Name', inputValue: 'newpage.com', handler: this.validateDomain},
      },
      dataForSave: {},
      showModals: false,
      modalLoad: true,
      modalError: false
    }
  },

  components: {
    ControlsList, FormConstructor, ModalsWrapper
  },

  computed: {
    ...mapState( {
      projectInfo: state => state.projectPage.projectInfo
    } )
  },

  methods: {
    ...mapActions( {
      createPage: 'projectPage/createPage',
      updateProjectInfo: 'projectPage/updateProjectInfo'
    } ),
    addPage() {
      this.createPage(this.projectInfo.id)
    },
    openModals() {
      document.body.style.overflow = 'hidden'
      if( this.projectInfo ) {
        this.modalLoad = false
        this.formData.siteURL.inputValue = this.projectInfo.siteURL
        this.showModals = true
      }
    },
    closeModals() {
      document.body.style.overflow = 'auto'

      this.showModals = false
      setTimeout( () => {
        this.dataForSave = {}
        this.modalLoad = true
      }, 300 )
    },
    saveAndCloseModals() {
      if( !this.modalError ){
        document.body.style.overflow = 'auto'

        this.updateProjectInfo( [this.projectInfo.id, this.dataForSave] )

        this.showModals = false
        setTimeout( () => {
          this.dataForSave = {}
          this.modalLoad = true
        }, 300 )
      }
    },
    changeData( [value] ) {
      this.dataForSave = value
    },
    validateDomain( value ) {
      if( !this.isDomain(value) ){
        this.modalError = true
        return true
      }
      this.modalError = false
      return false
    },
    isDomain( value ) {
      const regex = /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/gm
      const check = value.match(regex)
      if( check && check[0] === value )
        return true

      return false
    }
  }
}
</script>