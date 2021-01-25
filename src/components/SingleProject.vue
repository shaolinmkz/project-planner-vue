<template>
  <div class="project" :class="{ 'completed': project.complete }">
    <div class="actions">
      <h3 @click="showDetails = !showDetails">{{ project.title }}</h3>
      <div class="icons">
        <span class="material-icons" @click="deleteProject"> delete </span>
        <span class="material-icons"> edit </span>
        <span class="material-icons" @click="completeProject" :class="{ 'completed': project.complete }"> done </span>
      </div>
    </div>
    <div class="details" v-if="showDetails">
      <p>{{ project.details }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDetails: false,
      uri: "http://localhost:3000/projects",
    };
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteProject() {
      fetch(`${this.uri}/${this.project.id}`, {
        method: "DELETE",
      })
        .then(() => {
          this.$emit("deleteProject", this.project.id);
        })
        .catch((err) => console.log(err.message));
    },
    completeProject() {
      fetch(`${this.uri}/${this.project.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            complete: !this.project.complete
        })
      })
        .then(() => {
          this.$emit("completeProject", {
              ...this.project,
              complete: !this.project.complete,
          });
        })
        .catch((err) => console.log(err.message));
    },
  },
};

/**       
    {
        "id": 1,
        "title": "Create new homepage banner",
        "details": "Lorem ipsum 1",
        "complete": false
    },
    {
        "id": 2,
        "title": "Make marketing email",
        "details": "Lorem ipsum 2",
        "complete": false
    }
 */
</script>

<style>
.project {
  margin: 20px auto;
  background: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #e90074;
}

.project.completed {
  border-left-color: #00ce89;
}

h3 {
  cursor: pointer;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}

.material-icons:hover {
  color: #777;
}

.material-icons.completed {
  color: #00ce89;
}
</style>