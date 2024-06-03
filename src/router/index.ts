import { createRouter, createWebHistory } from "vue-router";
import Home1 from "./Home1";
import Home2 from "./Home2";
const routes = [Home1, Home2];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
