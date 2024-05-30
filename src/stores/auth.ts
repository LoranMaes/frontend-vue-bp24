import { defineStore } from "pinia";
import { User, UserCreation, UserLogin } from "../models/user.model";
import { computed, ref } from "vue";
import { apiAxios } from "../axios/apiAxios";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  const register = async (user: UserCreation) => {};
  const login = async (user: UserLogin) => {
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);

    await apiAxios
      .post("/auth/login", formData)
      .then((response) => console.log(response));
  };
  const logout = async () => {};

  return { user, isAuthenticated, register, login, logout };
});
