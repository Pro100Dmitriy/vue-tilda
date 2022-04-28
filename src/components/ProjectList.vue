<template>
  <div class="projects__list">
    <div class="projects__list-wrapper"
         v-if="!getLoading && !getError">
      <ProjectItem v-for="project of projectsData"
                   :key="project.id"
                   :project="project"/>
    </div>

    <div class="error"
         v-else-if="getError">
      <LottieComponent :options="lottieErrorOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
    </div>

    <div class="loader"
         v-else>
      <LottieComponent :options="lottieLoadingOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import ProjectItem from "@/components/ProjectItem"
import * as animationLoadingLottie from "@/assets/img/json/loader.json"
import * as animationErrorLottie from "@/assets/img/json/error.json"

export default {
  name: "ProjectList",

  props: {
    projectsData: { type: Array, required: true }
  },

  components: {
    ProjectItem
  },

  data() {
    return {
      lottieLoadingOptions: {animationData: animationLoadingLottie},
      lottieErrorOptions: {animationData: animationErrorLottie}
    }
  },

  computed: mapGetters( ['getLoading', 'getError'] ),

  methods: {
    handleAnimation( anim ) {
      this.anim = anim
    }
  },
}
</script>