import { createRouter, createWebHistory } from "vue-router";
import {
  useAuthGuardLoggedIn,
  useAuthGuardNotLoggedIn,
} from "./composables/authGuard";

const routes = [
  {
    path: "/",
    beforeEnter: useAuthGuardNotLoggedIn,
    children: [
      {
        path: "",
        name: "landingPage",
        component: () => import("./views/IlvoLandingPageView.vue"),
      },
      {
        path: "login",
        name: "login",
        components: {
          default: () => import("./views/IlvoLandingPageView.vue"),
          modal: () => import("./components/organisms/IlvoLoginForm.vue"),
        },
      },
      {
        path: "register",
        name: "register",
        components: {
          default: () => import("./views/IlvoLandingPageView.vue"),
          modal: () => import("./components/organisms/IlvoRegisterForm.vue"),
        },
      },
    ],
  },
  {
    path: "/",
    beforeEnter: useAuthGuardLoggedIn,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("./views/IlvoDashboardView.vue"),
      },
      {
        path: "calendar",
        name: "calendar",
        component: () => import("./views/IlvoCalendarView.vue"),
      },
      {
        path: "timer",
        name: "timer",
        component: () => import("./views/IlvoTimerView.vue"),
      },
      {
        path: "statistics",
        name: "statistics",
        component: () => import("./views/IlvoStatisticsView.vue"),
      },
      {
        path: "admin",
        children: [
          {
            path: "all-users",
            name: "allUsers",
            component: () => import("./views/admin/IlvoAllUsersView.vue"),
          },
          {
            path: "create-category",
            name: "createCategory",
            component: () => import("./views/admin/IlvoCreateUser.vue"),
          },
          {
            path: "create-user",
            name: "createCategory",
            component: () => import("./views/admin/IlvoCreateCategory.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("./views/Ilvo404View.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
