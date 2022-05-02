<template>
  <div class="projects__list">
    <div class="projects__list-wrapper"
         v-if="!isLoading && !isError && projectsList.length">
      <ProjectItem v-for="project of projectsList"
                   :project="project"
                   :key="project.id"/>
      <div class="wrapper"
           v-if="projectsList.length % 2 !== 0 && windowWidth > 856">
        <div class="empty-project-item"></div>
      </div>
    </div>

    <div class="empty"
         v-else-if="!isLoading && !isError && !projectsList.length">
      <LottieConstructor :options="lottieEmptyOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
      <div class="empty__subscribe">
        <h2>Projects are not created, click the "Create a new project"</h2>
      </div>
    </div>

    <div class="error"
         v-else-if="isError">
      <LottieConstructor :options="lottieErrorOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
    </div>

    <div class="loader"
         v-else>
      <LottieConstructor :options="lottieLoadingOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import ProjectItem from "@/components/ProjectItem"
import * as animationLoadingLottie from "@/assets/img/json/loader.json"
import * as animationErrorLottie from "@/assets/img/json/error.json"
import * as animationEmptyLottie from "@/assets/img/json/empty.json"


export default {
  name: "ProjectList",

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

  computed: {
    ...mapState( {
      projectsList: state => state.mainPage.projectsList,
      isLoading: state => state.mainPage.isProjectLoading,
      isError: state => state.mainPage.isProjectError
    } )
  },

  methods: {
    ...mapActions({
      fetchProjects: 'mainPage/fetchProjects'
    }),
    handleAnimation( anim ) {
      this.anim = anim
    }
  },

  mounted() {
    this.fetchProjects()
    window.addEventListener('resize', () => this.windowWidth = window.innerWidth )
  }
}
</script>