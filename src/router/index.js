import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AddProject from "../views/AddProject.vue";
import EditProject from "../views/EditProject.vue";

const routes = [
	{
		path: "/",
		redirect: '/projects',
	},
	{
		path: '/projects',
		name: "Home",
		component: Home,
	},
	{
		path: "/projects/add",
		name: "AddProject",
		component: AddProject,
	},
	{
		path: "/projects/edit/:id",
		name: "EditProject",
		component: EditProject,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
