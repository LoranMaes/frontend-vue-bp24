import { createMemoryHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "landingPage",
    component: () => import("./views/IlvoLandingPageView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("./views/IlvoDashboardView.vue"),
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
