<template>
  <BuilderSidebar :showBuilder="showBuilder"/>
  <div class="construct-page">

    <div v-if="!pageInfoLoading && !pageInfoError">
      <PageDevConstructor :layout="layoutScheme"/>
    </div>

    <div class="error"
         v-else-if="pageInfoError">
      <LottieConstructor :options="lottieErrorOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
    </div>

    <div class="loader"
         v-else>
      <LottieConstructor :options="lottieLoadingOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

import BuilderSidebar from "@/components/page/BuilderSidebar"
import PageDevConstructor from "@/components/page/PageDevConstructor"

import * as animationBuildingLottie from "@/assets/img/json/building.json"
import * as animationErrorLottie from "@/assets/img/json/error.json"
import * as animationEmptyLottie from "@/assets/img/json/empty.json"

export default {
  name: "EditablePageSection",

  data() {
    return {
      lottieLoadingOptions: {animationData: animationBuildingLottie},
      lottieErrorOptions: {animationData: animationErrorLottie},
      lottieEmptyOptions: {animationData: animationEmptyLottie},

      showBuilder: false,
      showContentSettings: false,

      layoutChanged: false,
      activePosition: null,
      layoutScheme: []
    }
  },

  provide() {
    return {
      openBuilder: this.openBuilder,
      closeBuilder: this.closeBuilder,

      addLayout: this.addLayout,
      deleteLayout: this.deleteLayout,
      changePositionLayout: this.changePositionLayout,
      copyLayout: this.copyLayout,
      visibilityLayout: this.visibilityLayout,
      saveNewContent: this.saveNewContent
    }
  },

  components: {
    BuilderSidebar, PageDevConstructor
  },

  methods: {
    ...mapActions( {
      saveLayout: 'editPage/saveLayout'
    } ),
    ...mapMutations( {
      layoutEdited: 'editPage/layoutEdited'
    } ),
    handleAnimation( anim ) {
      this.anim = anim
    },

    openBuilder( positionIndex ) {
      this.activePosition = positionIndex
      this.showBuilder = true
    },
    closeBuilder( beforeClose ) {
      beforeClose()
      this.showBuilder = false
    },

    addLayout( layout, beforeClose ) {
      let before = this.layoutScheme.slice(0, this.activePosition + 1)
      let after = this.layoutScheme.slice(this.activePosition + 1)

      this.layoutScheme = [
        ...before,
        layout,
        ...after
      ]

      this.layoutChanged = true
      this.closeBuilder( beforeClose )
    },
    deleteLayout( currentPosition ) {
      let before = this.layoutScheme.slice(0, currentPosition)
      let after = this.layoutScheme.slice(currentPosition + 1)

      this.layoutScheme = [
        ...before,
        ...after
      ]

      this.layoutChanged = true
    },
    changePositionLayout( direction, currentPosition ) {
      if( this.layoutScheme.length <= 1 )
        return

      const beforeElement = this.layoutScheme[currentPosition - 1]
      const moveElement = this.layoutScheme[currentPosition]
      const afterElement = this.layoutScheme[currentPosition + 1]
      let before, after, newLayout

      switch (direction) {
        case 'up':
          if( !beforeElement )
            break

          before = this.layoutScheme.slice(0, currentPosition - 1)
          after = this.layoutScheme.slice(currentPosition + 1)
          newLayout = [
              ...before,
              moveElement,
              beforeElement,
              ...after
          ]
          break
        case 'down':
          if( !afterElement )
            break

          before = this.layoutScheme.slice(0, currentPosition)
          after = this.layoutScheme.slice(currentPosition + 2)
          newLayout = [
            ...before,
            afterElement,
            moveElement,
            ...after
          ]
          break
      }

      this.layoutScheme = newLayout ? newLayout : this.layoutScheme
      this.layoutChanged = true
    },
    copyLayout( currentPosition ) {
      const copyElement = this.layoutScheme[currentPosition]
      let before = this.layoutScheme.slice(0, currentPosition + 1)
      let after = this.layoutScheme.slice(currentPosition + 1)

      this.layoutScheme = [
        ...before,
        copyElement,
        ...after
      ]

      this.layoutChanged = true
    },
    visibilityLayout( currentPosition ) {
      const visibilityElement = { ...this.layoutScheme[currentPosition] }
      visibilityElement.show = !visibilityElement.show

      let before = this.layoutScheme.slice(0, currentPosition)
      let after = this.layoutScheme.slice(currentPosition + 1)

      this.layoutScheme = [
        ...before,
        visibilityElement,
        ...after
      ]

      this.layoutChanged = true
    },
    saveNewContent( newContent, currentPosition ) {
      const editableElement = { ...this.layoutScheme[currentPosition] }
      const newElement = {
        ...editableElement,
        ...newContent
      }

      let before = this.layoutScheme.slice(0, currentPosition)
      let after = this.layoutScheme.slice(currentPosition + 1)

      this.layoutScheme = [
        ...before,
        newElement,
        ...after
      ]

      this.layoutChanged = true
    }
  },

  computed: {
    ...mapState( {
      pageInfo: state => state.editPage.pageInfo,
      pageInfoLoading: state => state.editPage.pageInfoLoading,
      pageInfoError: state => state.editPage.pageInfoError,
      layoutIsSaved: state => state.editPage.layoutIsSaved
    } ),
    ...mapGetters( {
      getLayout: 'editPage/getLayout'
    } ),
  },

  watch: {
    pageInfoLoading( loading ) {
      if( !loading && !this.pageInfoError ) {
        this.layoutScheme = [
          ...this.getLayout
        ]
      }
    },
    async layoutChanged(changed) {
      if( changed ){
        await this.saveLayout([this.pageInfo.id, this.layoutScheme])
      }
      this.layoutChanged = false
    }
  }
}
</script>