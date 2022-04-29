<template>
  <div class="projects__list">
    <div class="projects__list-wrapper"
         v-if="!getLoading && !getError && projectsData.length">
      <ProjectItem v-for="project of projectsData"
                   :key="project.id"
                   :project="project"/>
      <div class="wrapper"
           v-if="projectsData.length % 2 !== 0 && windowWidth > 839">
        <div class="empty-project-item"></div>
      </div>
    </div>

    <div class="empty"
         v-else-if="!getLoading && !getError && !projectsData.length">
      <LottieConstructor :options="lottieEmptyOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
      <div class="empty__subscribe">
        <h2>Projects are not created, click the "Create a new project"</h2>
      </div>
    </div>

    <div class="error"
         v-else-if="getError">
      <LottieConstructor :options="lottieErrorOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
    </div>

    <div class="loader"
         v-else>
      <LottieConstructor :options="lottieLoadingOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import ProjectItem from "@/components/ProjectItem"
import * as animationLoadingLottie from "@/assets/img/json/loader.json"
import * as animationErrorLottie from "@/assets/img/json/error.json"
import * as animationEmptyLottie from "@/assets/img/json/empty.json"

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
      lottieErrorOptions: {animationData: animationErrorLottie},
      lottieEmptyOptions: {animationData: animationEmptyLottie},
      windowWidth: window.innerWidth
    }
  },

  computed: mapGetters( ['getLoading', 'getError'] ),

  methods: {
    handleAnimation( anim ) {
      this.anim = anim
    }
  },

  mounted() {
    window.addEventListener('resize', () => this.windowWidth = window.innerWidth )
  }
}
</script>