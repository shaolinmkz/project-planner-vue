<template>
  <h1>Edit Project</h1>
  <form v-if="project" @submit.prevent="handleProjectUpdate">
    <label for="title">Title:</label>
    <input type="text" v-model="project.title" />
    <label for="details">Details:</label>
    <textarea name="details" id="details" v-model="project.details"></textarea>
    <button type="submit">Update Project</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      project: null,
      uri: "http://localhost:3000/projects",
    };
  },
  mounted() {
    fetch(`${this.uri}/${this.$route.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        this.project = data;
      })
      .catch((err) => console.log(err.message));
  },
  methods: {
    handleProjectUpdate() {
      fetch(`${this.uri}/${this.$route.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.project),
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>

<style>
form {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input {
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  transition: background ease 0.2s;
}

form button:hover {
  cursor: pointer;
  background: #01e096;
}
</style>
