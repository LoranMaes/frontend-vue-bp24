import { useAuthStore } from "../stores/auth";
import type { RouteLocation } from "vue-router";

export async function useAuthGuardLoggedIn(to: RouteLocation) {
  to.fullPath;
  const authStore = useAuthStore();
  await authStore.initUser();
  if (!authStore.isAuthenticated) {
    return { name: "landingPage" };
  }
  return;
}

export async function useAuthGuardNotLoggedIn(to: RouteLocation) {
  to.fullPath;
  const authStore = useAuthStore();
  await authStore.initUser();
  if (authStore.isAuthenticated) {
    return { name: "dashboard" };
  }
  return;
}

export async function useAuthGuardAdmin(to: RouteLocation) {
  to.fullPath;
  const authStore = useAuthStore();
  await authStore.initUser();
  if (authStore.isAuthenticated && authStore.user?.role !== "admin") {
    return { name: "dashboard" };
  }
  return;
}
