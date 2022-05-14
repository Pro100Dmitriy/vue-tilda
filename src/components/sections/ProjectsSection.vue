<template>
  <section class="projects">
    <div class="container">

      <div class="projects__wrapper">

        <div class="projects__buttons">
          <div class="projects__buttons-left">
            <p>My Projects</p>
          </div>
          <div class="projects__buttons-right">
            <button class="plus-button projects__plus-buttons"
                    aria-label="Create a new project"
                    @click="addNewProject">
              <span class="plus-button__img">
                 <img :src="plusIcon" alt="Plus Icon" aria-hidden="true">
              </span>
              Create a new project
            </button>
            <button class="plus-button projects__plus-buttons"
                    disabled
                    aria-label="Create mailing list">
              <span class="plus-button__img">
                 <img :src="plusIcon" alt="Plus Icon" aria-hidden="true">
              </span>
              Create mailing list
            </button>
          </div>
        </div>

        <ProjectList/>

      </div>

    </div>
  </section>
</template>

<script>
import {mapActions, mapState} from "vuex"

import ProjectList from "@/components/ProjectList/ProjectList"

import plusIcon from '@/assets/img/svg/plus.svg'

export default {
  name: "ProjectsSection",

  data() {
    return {
      plusIcon: plusIcon,
    }
  },

  components: {
    ProjectList
  },

  methods: {
    ...mapActions( {
      createProject: 'mainPage/createProject'
    } ),
    addNewProject( event ) {
      event.target.disabled
      this.createProject(this.projectsList)
      setTimeout( () => event.target.enable, 200 )
    }
  },

  computed: {
    ...mapState( {
      projectsList: state => state.mainPage.projectsList
    } )
  }
}
</script>