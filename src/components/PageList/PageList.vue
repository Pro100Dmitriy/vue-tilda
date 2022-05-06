<template>
  <div class="pages-list">
    <div class="pages-list-wrapper"
         v-if="!projectInfoLoading && !projectInfoError && getPages.length">
      <PageListItem v-for="page of getPages"
                    :key="page.pageId"
                    :pageId="page.pageId"
                    :imgSrc="page.prevImage"
                    :title="page.title"/>
    </div>


    <div class="empty"
         v-else-if="!projectInfoLoading && !projectInfoError && !getPages.length">
      <LottieConstructor :options="lottieEmptyOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
      <div class="empty__subscribe">
        <h2>Projects are not created, click the "Create a new project"</h2>
      </div>
    </div>

    <div class="error"
         v-else-if="projectInfoError">
      <LottieConstructor :options="lottieErrorOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
    </div>

    <div class="loader"
         v-else>
      <LottieConstructor :options="lottieLoadingOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";

import PageListItem from "@/components/PageList/PageListItem"
import * as animationLoadingLottie from "@/assets/img/json/loader.json"
import * as animationErrorLottie from "@/assets/img/json/error.json"
import * as animationEmptyLottie from "@/assets/img/json/empty.json"

export default {
  name: "PageList",

  data() {
    return {
      lottieLoadingOptions: {animationData: animationLoadingLottie},
      lottieErrorOptions: {animationData: animationErrorLottie},
      lottieEmptyOptions: {animationData: animationEmptyLottie}
    }
  },

  components: {
    PageListItem
  },

  methods: {
    handleAnimation( anim ) {
      this.anim = anim
    }
  },

  computed: {
    ...mapState( {
      projectInfoLoading: state => state.projectPage.projectInfoLoading,
      projectInfoError: state => state.projectPage.projectInfoError
    } ),
    ...mapGetters( {
      getPages: 'projectPage/getPages',
    } )
  }
}
</script>