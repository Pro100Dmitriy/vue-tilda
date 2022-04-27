<template>
  <div class="projects">
    <ContainerComponent>

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

        <div class="projects__list">
          <ProjectItem
              v-for="project of getProjects"
              :key="project.id"
              :project="project"/>
        </div>
      </div>

    </ContainerComponent>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import ContainerComponent from "@/components/ContainerComponent";
import PlusButton from "@/components/PlusButton";
import ProjectItem from "@/components/ProjectItem";

export default {
  name: "ProjectLayouts",
  components: {
    ContainerComponent, PlusButton, ProjectItem
  },
  computed: mapGetters( ['getProjects'] ),
  methods: {
    ...mapMutations( ['createNewProject'] ),
    createProject() {
      const newProject = {
        id: Date.now(),
        title: `My Project ${this.getProjects.length}`
      }
      this.createNewProject(newProject)
    }
  }
}
</script>