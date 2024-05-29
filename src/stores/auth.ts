import { defineStore } from "pinia";
import { UserCreation, UserLogin } from "../models/user.model";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<null | Object>(null);
  const isAuthenticated = computed(() => !!user.value);

  const register = async (user: UserCreation) => {};
  const login = async (user: UserLogin) => {};
  const logout = async () => {};

  return { user, isAuthenticated, register, login, logout };
});
