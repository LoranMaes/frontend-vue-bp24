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
        meta: {
          slideDown: true,
        },
      },
      {
        path: "register",
        name: "register",
        components: {
          default: () => import("./views/IlvoLandingPageView.vue"),
          modal: () => import("./components/organisms/IlvoRegisterForm.vue"),
        },
        meta: {
          slideDown: true,
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
            path: "create-user",
            name: "createUser",
            component: () => import("./views/admin/IlvoCreateUser.vue"),
          },
          {
            path: "all-categories",
            name: "allCategories",
            component: () => import("./views/admin/IlvoAllCategoriesView.vue"),
          },
          {
            path: "create-category",
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
    component: () => import("./views/IlvoNotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresSlideDown = from.meta.slideDown;
  if (requiresSlideDown) {
    const login = document.querySelector("#login-form");
    const register = document.querySelector("#register-form");
    if (login) {
      login.classList.add("slide-down");
    }
    if (register) {
      register.classList.add("slide-down");
    }
    setTimeout(() => {
      next();
    }, 500);
  } else {
    next();
  }
});

export default router;
