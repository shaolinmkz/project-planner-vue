<template>
  <div class="home">
    <div v-if="projects.length">
      <div v-for="project in projects" :key="project.id">
        <SingleProject :project="project" @deleteProject="handleDeleteProject" @completeProject="handleCompleteProject" />
      </div>
    </div>
  </div>
</template>


<script>
import SingleProject from '../components/SingleProject.vue';

export default {
  name: "Home",
  components: {
    SingleProject
  },
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    handleDeleteProject(projectId) {
      this.projects = this.projects.filter(({ id }) => id !== projectId)
    },
    handleCompleteProject(singleProject) {
      this.projects = this.projects.map(project => project.id === singleProject.id ? singleProject : project)
    }
  },
  mounted() {
    fetch("http://localhost:3000/projects")
      .then((res) => res.json())
      .then((data) => {
        this.projects = data;
      })
      .catch(({ message }) => console.log(message));
  },
};
</script>
