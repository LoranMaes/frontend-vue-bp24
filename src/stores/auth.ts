import { defineStore } from "pinia";
import { User, UserCreation, UserLogin } from "../models/user.model";
import { computed, ref } from "vue";
import { apiAxios } from "../axios/apiAxios";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  // This checks if the user is valid, if not the user gets a form with more details.
  const isValidUser = computed(() => true);

  const getUser = async (): Promise<User | void> => {
    try {
      const resp = await apiAxios.get("/auth/user");
      if (resp.status !== 200) return;
      return (user.value = resp.data.data);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  const initUser = async (): Promise<void> => {
    if (isAuthenticated.value) return;
    await getUser();
    console.log(user.value);
  };

  const register = async (
    user_request: UserCreation
  ): Promise<User | void> => {};

  const login = async (user_request: UserLogin): Promise<User | void> => {
    const formData = new FormData();
    formData.append("email", user_request.email);
    formData.append("password", user_request.password);
    try {
      // Login
      const resp = await apiAxios.post("/auth/login", formData);
      if (resp.status !== 200) return;
      // Get user data and store it
      return await getUser();
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };
  const logout = async () => {
    try {
      const resp = await apiAxios.post("/auth/logout");
      if (resp.status !== 200) return;
      user.value = null;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  return { user, isAuthenticated, register, login, logout, initUser };
});
