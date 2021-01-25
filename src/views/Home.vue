<template>
  <FilterNav :current="filterValue" @filterChange="handleFilterEvent" />
  <div class="home">
    <div v-if="projects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <SingleProject
          :project="project"
          @deleteProject="handleDeleteProject"
          @completeProject="handleCompleteProject"
        />
      </div>
    </div>
  </div>
</template>


<script>
import SingleProject from "../components/SingleProject.vue";
import FilterNav from "../components/FilterNav.vue";

export default {
  name: "Home",
  components: {
    SingleProject,
    FilterNav,
  },
  data() {
    return {
      // backupProjects: [],
      projects: [],
      filterValue: "all",
    };
  },
  methods: {
    handleDeleteProject(projectId) {
      this.projects = this.projects.filter(({ id }) => id !== projectId);
      // this.backupProjects = this.projects;
    },
    handleCompleteProject(singleProject) {
      this.projects = this.projects.map((project) =>
        project.id === singleProject.id ? singleProject : project
      );
      // this.backupProjects = this.projects;
    },
    handleFilterEvent(by) {
      this.filterValue = by;
    },
    // handleFilterProject(by) {
    //   this.filterValue = by;

    //   if (by === "all") {
    //     this.projects = this.backupProjects;
    //   } else if (by === "ongoing") {
    //     this.projects = this.backupProjects.filter(({ complete }) => !complete);
    //   } else if (by === "completed") {
    //     this.projects = this.backupProjects.filter(({ complete }) => complete);
    //   }
    // },
  },
  computed: {
    filteredProjects() {
      if (this.filterValue === "ongoing") {
        return this.projects.filter(({ complete }) => !complete);
      } else if (this.filterValue === "completed") {
        return this.projects.filter(({ complete }) => complete);
      }
      return this.projects;
    },
  },
  mounted() {
    fetch("http://localhost:3000/projects")
      .then((res) => res.json())
      .then((data) => {
        this.projects = data;
        this.backupProjects = data;
      })
      .catch(({ message }) => console.log(message));
  },
};
</script>
