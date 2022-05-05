<template>
  <div class="projects">
    <ContainerLayout>

      <div class="projects__wrapper">

        <div class="projects__buttons">
          <div class="projects__buttons-left">
            <p>My Projects</p>
          </div>
          <div class="projects__buttons-right">
            <PlusButton
                class="projects__plus-buttons"
                title="Create a new project"
                @click="createProject(projectsList)"/>
            <PlusButton class="projects__plus-buttons" title="Create mailing list" :disabled="true"/>
          </div>
        </div>

        <ProjectList/>

      </div>

    </ContainerLayout>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

import ContainerLayout from "@/layouts/ContainerLayout"
import ProjectList from "@/components/ProjectList/ProjectList"

export default {
  name: "ProjectLayouts",

  components: {
    ContainerLayout, ProjectList
  },

  computed: mapState( {
    projectsList: state => state.mainPage.projectsList
  } ),

  methods: {
    ...mapActions( {
      createProject: 'mainPage/createProject'
    } )
  }
}
</script>