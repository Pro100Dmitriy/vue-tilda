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
                @click="createProject"/>
            <PlusButton class="projects__plus-buttons" title="Create mailing list" disabled="true"/>
          </div>
        </div>

        <ProjectList :projectsData="getProjects"/>

      </div>

    </ContainerLayout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import http from '@/server/http'

import ContainerLayout from "@/layouts/ContainerLayout"
import ProjectList from "@/components/ProjectList"

export default {
  name: "ProjectLayouts",

  components: {
    ContainerLayout, ProjectList
  },

  computed: mapGetters( ['getProjects'] ),

  methods: {
    ...mapActions( ['fetchProjects'] ),
    createProject() {
      const newProject = {
        id: Date.now(),
        title: `My Project ${this.getProjects.length}`
      }
      http( 'http://localhost:8081/projects', 'POST', newProject )
        .then( () => this.fetchProjects() )
        .catch( error => console.log( error ) )
    }
  },

  async mounted() {
    try {
      this.fetchProjects()
    }catch( error ){
      console.log( error )
    }
  }
}
</script>